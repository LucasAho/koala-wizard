axios = require("axios");

//Get route scrapes the Hill website

module.exports = function(app) {
    app.get("/scrape", (res, req) => {
        axios.get("https://overwatchleague.com/en-us/schedule").then(response => {
            var $ = cheerio.load(response.data);
            console.log(response.data);
        })
    });
}