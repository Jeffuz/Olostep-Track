const express = require("express");
const scrapeModel = require("../model/scrape_result");
const scrapeWebpage = require("../services/scraper");
const { validateRequest } = require("../middleware");


const router = express.Router();

router.post("", validateRequest, async (req, res) => {
    try {
        const getDoc = await scrapeModel.findOne({
            url: req.body.url,
            dataType: "Clean"
        });
        const getRawDoc = await scrapeModel.findOne({
            url: req.body.url,
            dataType: "Raw"
        });

        if(getDoc) {
            return res.json({
                raw_data: getRawDoc,
                clear_data: getDoc
            });
        }

        const scrapedData = await scrapeWebpage(
            req.body.url, {scrollToBottom: true,
            extractImages: true,
            extractLinks: true,
            customClass: 'some-class',
            outputFile: 'scrape_result.json'});

        const createWebpage = new scrapeModel({
            ...scrapedData.clean_data, dataType: "Clean"}
         );
        const createRawWebpage = new scrapeModel({
            ...scrapedData.raw_data, dataType: "Raw"}
         );

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
