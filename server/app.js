const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    // URL to scrape
    await page.goto('https://quotes.toscrape.com/');
    
    const quotes = await page.evaluate(() => {
        const quoteElements = document.querySelectorAll('.quote');
        const quotesArray = [];

        for(const quoteElement of quoteElements) {
            const quoteText = quoteElement.querySelector('.text').innerText;
            const author = quoteElement.querySelector('.author').innerText;
            
            const tagElements = quoteElement.querySelectorAll('.tags .tag');
            const tagsArray = [];

            for(const tagElement of tagElements) {
                const tagLabel = tagElement.innerText;
                tagsArray.push(tagLabel);
            }


            quotesArray.push({
                quote: quoteText,
                author: author,
                tags: tagsArray
            });

        }
        
        return quotesArray;
    });

    console.log(quotes);

    await browser.close();

})();