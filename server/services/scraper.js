const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
// const fs = require('fs').promises;

// const ScrapeResult = require('./scrape_result');

async function scrapeWebpage(url, options = {}) {

  //will be used as default values
  const {
   //headless = true,
    timeout = 30000,
    waitForSelector = 'body',
    scrollToBottom = false,
    extractImages = false,
    extractLinks = false,
    customClass = 'some-class', //allowing class customization rather than just 'some-class'
  } = options;

let browser;
  try {
    // Launch the browser
    //  browser = await puppeteer.launch({
    //     executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
    //  }); 
     browser = await puppeteer.launch();
    const page = await browser.newPage();


    // Set a timeout for navigation
    await page.setDefaultNavigationTimeout(timeout);

   // Navigate to the URL and wait for the selector
   const response = await page.goto(url, { waitUntil: 'networkidle0' });
   
   // Check for HTTP errors
   if (!response.ok()) {
     throw new Error(`HTTP error! status: ${response.status()}`);
   }

   await page.waitForSelector(waitForSelector, { visible: true });

   // Scroll to the bottom if option is set
   if (scrollToBottom) {
    await autoScroll(page);
  }


  // Wait for images to load - avoiding null in images array in o/p, this will wait for images with lazy loading and dynamic images to load first
  await page.evaluate(async () => {
    const imgElements = document.getElementsByTagName('img');
    const imgPromises = [...imgElements].map(img => {
      if (img.complete) return;
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    });
    await Promise.all(imgPromises);
  });




    // Get the page content
    const content = await page.content();


    //to get raw data of the page
    const pageData = await page.evaluate(() => {
    return{
        html: document.documentElement.innerHTML.replace(/[\t\n]/g, '').trim(),
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    };
    });
    console.log('raw data:',pageData);

    // Load the HTML content into cheerio
    const $ = cheerio.load(content);

    // Initializing the result object
    const result = {
      url,
      title: $('title').text().trim(),
      paragraphs: [],
      elementsWithClass: [],
      images: [],
      links: [],
    };

    // Extract and print the title
    const title = $('title').text();
    console.log('Title:', title);

    

    // Extract and print all paragraph text
    /*$('p').each((index, element) => {
      result.paragraphs.push($(element).text());
    });*/

    $('p').each((index, element) => {
        const text = $(element).text().trim().replace(/\s+/g, ' ');
        if (text) result.paragraphs.push(text);
      });

    // Extract and print elements with class 'some-class'
   /* $('.some-class').each((index, element) => {
      result.elementsWithClass.push($(element).text());
    });*/

    $(`.${customClass}`).each((index, element) => {
        const text = $(element).text().trim().replace(/\s+/g, ' ');
        if (text) result.elementsWithClass.push(text);
      });

    // Extract images if option is set, images starting with data will not be printed
    if (extractImages) {
        $('img').each((index, element) => {
          const src = $(element).attr('src');
          if (src && !src.startsWith('data:')) result.images.push(src);
        });
      }
    // Extract links if option is set, also removed duplicate links
    if (extractLinks) {
        const uniqueLinks = new Set();
        $('a').each((index, element) => {
          const href = $(element).attr('href');
          const text = $(element).text().trim();
          if (href && !uniqueLinks.has(href)) {
            uniqueLinks.add(href);
            result.links.push({ text, href });
          }
        });
      }

    // log results
    console.log('cleaned data:',JSON.stringify(result, null, 2));

      return {
        raw_data: {
            url,
            title: result.title,
            ...pageData
        },
        clean_data: result
      };

    
  } catch (error) {
    console.error('An error occurred:', error);
  }finally{
    if(browser){
      // Close the browser
    await browser.close();
    }
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = scrapeWebpage;