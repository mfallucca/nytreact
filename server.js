const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("./models/Article.js");
// Require all models
const db = require("./models");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);


// Main "/" Route. This will redirect the user to our rendered React app
// line 47 might need /public removed - have to see how it works
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// Get - route components use to query db for all saved articles.
app.get("/api/saved", function(req, res) {

  // find all records then sort by date in descending order and return 10 records
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(10).exec(function(err, doc) {
    
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }

  });
});


// Post - route components use to save article to the db
app.post("/api/saved", function(req, res) {

// creates variable to store data from article body
  var newArticle = new Article(req.body);

// breaks down requested body data and stores in seperate variables
  var title = req.body.title;
  var date = req.body.date;
  var url = req.body.url;

// saves article
  newArticle.save(function(err, doc){

    if (err) {
      console.log(err);
    } else {
      res.send("Saved Search" + doc._id);
    }

  });

});


// Delete - route components use to delete a saved article
app.delete("/api/saved", function(req, res) {

  var url = req.params('url');

  Article.find({"url": url}).remove().exec(function(err, data){

    if(err){
      console.log(err);
    }
    else {
      res.send("Article Deleted");
    }

  });

});


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});