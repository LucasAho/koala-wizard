//Server package
const express = require('express');
//noSQL database package
const mongoose = require('mongoose');

//Scraping packages
const cheerio = require('cheerio');
const axios = require('axios');

var PORT = 3000;

//Initialize Express
const app = express();

//Handlebars package and initiation
const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var db = require("./models");



// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Connecting to mongo database
mongoose.connect("mongodb://localhost/newsPopulater", { useNewUrlParser: true});

// Routes
require("./routes/escrapeRoute")(app);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  