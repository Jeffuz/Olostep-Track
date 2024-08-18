require('dotenv').config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_ATLAS_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
    