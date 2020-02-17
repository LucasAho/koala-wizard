//Server package
const express = require('express');
//noSQL database package
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require("axios");


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

mongoose
.connect("mongodb://localhost/mongoHeadlines", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});


// Routes
app.get("/scrape", (req, res) => {
        
    axios.get("https://www.pbs.org/newshour/politics/").then(response => {
        var $ = cheerio.load(response.data);
        var articles = [];

        $(".card-lg").each(function(i, element) {
            var head = $(element).find(".card-lg__title").text().trim();
            var URL = $(element).find(".card-lg__title").attr('href');
            var sum = $(element).find(".card-lg__excerpt").text().trim();
            if (head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    title: headNeat,
                    desc: sumNeat,
                    URL: URL
                }
                articles.push(dataToAdd);
                
            }
        });
        console.log(articles);
        db.Article.create(articles, (error, saved) => {
            if (error) {
                console.log(error);
            } else {
                res.send(saved);
            }
        })
        .then(dbArticle => {
            res.render("index", {
                articles: dbArticle
            });
        })
        .catch(err => {console.log(dbArticle);});
         // Send a message to the client
        console.log("Scrape Complete");

    });

   
});

app.get("/", function (req, res) {
    db.Article.find({},() => {})
    .then(dbArticle => {
        res.render("index", {
            articles: dbArticle
        });
    })
    .catch(err => {
        res.json(err);
    });
});
app.get("/saved", function (req, res) {
    res.render("saved", {
    });
});


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  