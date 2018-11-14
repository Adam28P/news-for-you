//require axios and cheerio to scrape
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {

  axios.get("https://globalnews.ca/toronto/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    var articlesArray = [];
    // Now, we grab every article
    $('.stream-main article').each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children('h3').children('a').text();
      result.link = $(this).children('h3').children('a').attr('href');
      result.sentence = $(this).children('.story-txt').children('p').text();

      articlesArray.push(result);
    });
    cb(articlesArray);
  });
}

module.exports = scrape;