require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./routes/index");

const bodyParser = require("body-parser");
const { body } = require('express-validator');

// const { validateRequest } = require("./middleware");

require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/scrape", [
    body('url')
        .isURL()
        .withMessage('Please provide a valid URL')
    ], router);

app.get("/ping", (req, res) => {
    res.status(200).send("Server Is Up!");
});

app.use("", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("listning...");
});
