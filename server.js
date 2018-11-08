var express = require("express");
var exphbs = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

var router = express.Router();

app.use(express.static(__dirname + "/public"));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

require("./config/routes")(router);

app.use(logger("dev"));

var db = process.env.MONGODB_URI || "mongodb://localhost/news_for_you";

mongoose.connect(db, function(error){
  if(error){
    console.log(error);
  } else {
    console.log("Mongoose connection successful!");
  }
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});