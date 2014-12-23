var yelp = require("yelp").createClient({
  consumer_key: "lA736NP1osOfTXudrMTfZw", 
  consumer_secret: "IW4ne8VDMbrWGSkPak9z2AZK_sk",
  token: "wvOx_MpAa1P6oBK4ASq-IlfzHgqFV5Lf",
  token_secret: "Kmi79-x8Ldc36uAwNM8SOnEuFm8"
});

var async = require('async');
var _ = require('lodash');

var allYelpResults = []
var searchTerms = ["hotels", "parks"]

async.each(searchTerms, function(searchTerm, callback) {
	//Do this for each searchTerm
	console.log("this searchTerm", searchTerm)
	yelp.search({term:"dog friendly", category_filter: searchTerm, location: "Seattle, WA"}, function(err,data) {
		// take each yelp result and add it a bigger array
		allYelpResults.push(data.businesses)
		callback(err);
	});

},function(err) {
	console.log(allYelpResults);
	// console.log("finished");
	// res.render('search', allYelpResults)
})