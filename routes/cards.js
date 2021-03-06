var request = require('request');
var cheerio = require('cheerio');

//Get top 100 most popular ecards
exports.get_popular_cards = function(callback) {
  request('http://www.someecards.com/popular-cards/most-sent-today/1/100/',
    function (error, response, body) {
      var results = {};
      if (!error && response.statusCode === 200) {
        $ = cheerio.load(body);
        $(".cardthumb").each(function(i, elem) {
          results[i] = {'url': elem.attribs.href};
          request('http://www.someecards.com' + results[i].url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              $2 = cheerio.load(body);
              if ($2('.main-img')[0] !== undefined) {
                results[i].img = $2(".main-img")[0].attribs.src;
              }
            }
          });
        });
        callback(results);
      }
  });
};
