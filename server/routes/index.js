const express = require("express");
const scrapeModel = require("../model/scrape_result");

const router = express.Router();

router.post(async (req, res) => {
    try {
        const scrapedData = scrapeWebpage(req.body.url);

        const createWebpage = new scrapeModel({
            title: scrapedData.title,
        ///
        });

        await createWebpage.save();

        // after saving we will return the result

        // to be transformed if not yet
        return res.json(scrapedData);
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" });
    }
    
});
// router.post("process", processesDataScrapingService)

module.exports = router;
