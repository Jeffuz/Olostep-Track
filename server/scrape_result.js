const mongoose = require("mongoose");

const scrapeResultSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    paragraphs: [String],
    elementsWithClass: [String],
    images: [String],
    links: [
        {
            text: String,
            href: String,
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("ScrapeResult", scrapeResultSchema);