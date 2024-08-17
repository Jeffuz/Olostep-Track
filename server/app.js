require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
    res.status(200).send("Server Is Up!");
});

app.use("", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("listning...");
});

