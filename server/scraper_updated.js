const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;

async function scrapeWebpage(url, options = {}) {

  //will be used as default values
  const {
    headless = true,
    timeout = 30000,
    waitForSelector = 'body',
    scrollToBottom = false,
    extractImages = false,
    extractLinks = false,
  } = options;

let browser;
  try {
    // Launch the browser
     browser = await puppeteer.launch(); 
    const page = await browser.newPage();


    // Set a timeout for navigation
    await page.setDefaultNavigationTimeout(timeout);

   // Navigate to the URL and wait for the selector
   await page.goto(url, { waitUntil: 'networkidle0' });
   
   /*In the Puppeteer code, not in the options object if u want to wait until the element is visible
await page.waitForSelector('#element', { visible: true });
*/
   await page.waitForSelector(waitForSelector);

   // Scroll to the bottom if option is set
   if (scrollToBottom) {
    await autoScroll(page);
  }
    // Get the page content
    const content = await page.content();

    // Load the HTML content into cheerio
    const $ = cheerio.load(content);

    // Initializing the result object
    const result = {
      url,
      title: $('title').text(),
      paragraphs: [],
      elementsWithClass: [],
      images: [],
      links: [],
    };

    // Extract and print the title
    const title = $('title').text();
    console.log('Title:', title);

    // Generating title for JSON file
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const outputFile = `${safeTitle}.json`;

    // Extract and print all paragraph text
    $('p').each((index, element) => {
      result.paragraphs.push($(element).text());
    });

    // Extract and print elements with class 'some-class'
    $('.some-class').each((index, element) => {
      result.elementsWithClass.push($(element).text());
    });
    // Extract images if option is set
    if (extractImages) {
      $('img').each((index, element) => {
        result.images.push($(element).attr('src'));
      });
    }
    // Extract links if option is set
    if (extractLinks) {
      $('a').each((index, element) => {
        result.links.push({
          text: $(element).text(),
          href: $(element).attr('href'),
        });
      });
    }

    // log results
    console.log(JSON.stringify(result, null, 2));

    // Save to file if outputFile is specified
    if (outputFile) {
      await fs.writeFile(outputFile, JSON.stringify(result, null, 2));
      console.log(`Results saved to ${outputFile}`);
    }

      return result;

    
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



// Usage
const targetUrl = 'https://jasonyay210.github.io/portfolio/'; // Replace with target URL
scrapeWebpage(targetUrl, {
  headless: false,
  scrollToBottom: true,
  extractImages: true,
  extractLinks: true,
  outputFile: 'scrape_result.json',
});
