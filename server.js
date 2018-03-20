var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");
var Article = require("./models/Article");
var Notes = require("./models/Notes");
var path = require("path");
var router = require('./controllers/controller.js');

mongoose.Promise = Promise;

var app = express();

app.use(express.static("public"));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Mongoose database configuration
var promise = mongoose.connect("mongodb://localhost/ScrapingTheOnion", {
  useMongoClient: true,
});

promise.then(function(db){
    db.on("error", function(error){
    console.log("Mongoose Error: ", error);
    });

    // success message once logged in to db mongoose
    db.once("open", function(){
        console.log("Mongoose connection successful");
    });
});

app.use('/', router);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});