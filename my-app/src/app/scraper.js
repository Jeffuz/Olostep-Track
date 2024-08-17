const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeWebpage(url) {
  try {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Get the page content
    const content = await page.content();

    // Load the HTML content into cheerio
    const $ = cheerio.load(content);

    // Extract and print the title
    const title = $('title').text();
    console.log('Title:', title);

    // Extract and print all paragraph text
    $('p').each((index, element) => {
      console.log('Paragraph:', $(element).text());
    });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Usage
const targetUrl = 'https://example.com'; // Replace with your target URL
scrapeWebpage(targetUrl);