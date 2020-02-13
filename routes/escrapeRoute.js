const cheerio = require('cheerio');
const axios = require("axios");

//Get route scrapes the Hill website

module.exports = function(app) {
    app.get("/scrape", (res, req) => {
        axios.get("https://www.nytimes.com/").then(response => {
            var $ = cheerio.load(response.data);
            console.log($);
        })
    });
}