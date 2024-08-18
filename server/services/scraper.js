const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeWebpage(url, options = {}) {
  const {
    timeout = 60000,            // Increased timeout to handle heavier websites
    waitForSelector = 'body',
    scrollToBottom = false,
    extractImages = false,
    extractLinks = false,
    customClass = 'some-class',
  } = options;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--remote-debugging-port=9222'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(timeout);

    // Optimize request handling to block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navigate to the URL
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    if (!response.ok()) {
      throw new Error(`HTTP error! status: ${response.status()}`);
    }

    // Wait for the main content to load
    await page.waitForSelector(waitForSelector, { visible: true });

    // Scroll to the bottom if the option is set
    if (scrollToBottom) {
      await autoScroll(page);
    }

    // Wait for images to load completely
    if (extractImages) {
      await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('img'));
        await Promise.all(images.map(img => {
          if (img.complete) return;
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
          });
        }));
      });
    }

    // Get the page content
    const content = await page.content();

    // Get raw data of the page
    const pageData = await page.evaluate(() => ({
      html: document.documentElement.innerHTML.replace(/[\t\n]/g, '').trim(),
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }));
    console.log('raw data:', pageData);

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

    // Extract paragraphs
    $('p').each((index, element) => {
      const text = $(element).text().trim().replace(/\s+/g, ' ');
      if (text) result.paragraphs.push(text);
    });

    // Extract elements with the custom class
    $(`.${customClass}`).each((index, element) => {
      const text = $(element).text().trim().replace(/\s+/g, ' ');
      if (text) result.elementsWithClass.push(text);
    });

    // Extract images
    if (extractImages) {
      $('img').each((index, element) => {
        const src = $(element).attr('src');
        if (src && !src.startsWith('data:')) result.images.push(src);
      });
    }

    // Extract links
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

    // Log the cleaned data
    console.log('cleaned data:', JSON.stringify(result, null, 2));

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
  } finally {
    if (browser) {
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
