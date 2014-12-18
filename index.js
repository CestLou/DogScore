var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
//all keys have a link to the ignored env file. as to not be included in github push!
var yelp = require("yelp").createClient({
  consumer_key: "lA736NP1osOfTXudrMTfZw", 
  consumer_secret: "IW4ne8VDMbrWGSkPak9z2AZK_sk",
  token: "wvOx_MpAa1P6oBK4ASq-IlfzHgqFV5Lf",
  token_secret: "Kmi79-x8Ldc36uAwNM8SOnEuFm8"
});
var async = require('async');
var _ = require('lodash');

// var google_geocoding = require('google-geocoding');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))



// var db = require('./models')


// app.get('/', function(req, res) {
// 	res.render('index', {allYelpResults:{
// 		results:{
// 			region:{
// 				center:{
// 					latitude:null,
// 					longitude:null
// 					}
// 				}
// 			}
// 		}
// 	})
// });




app.get('/', function(req, res) {
	var allYelpResults = []
	// var searchTerms = ['hotels', 'vet']
	var searchTerms = (req.query.searchParams && req.query.searchParams.constructor === String ) ?  new Array(req.query.searchParams) : req.query.searchParams;
	searchTerms = searchTerms || ['dog_parks']
	// var searchTerms = req.query.searchParams;
	// console.log(Array.isArray(searchTerms))

	async.each(searchTerms, function(searchTerm, callback) {
		//Do this for each searchTerm
		yelp.search({term:"dog friendly", category_filter: searchTerm, location: "Seattle, WA"}, function(err,data) {
			allYelpResults.push(data)
			callback(err);
		});
	},function(err) {
		// console.log(allYelpResults.length);
		var results = {total:0, businesses:[], region:{}};
		// allYelpResults = JSON.stringify(allYelpResults[0])
		for (var i=0; i < allYelpResults.length; i++) {
			// console.log(allYelpResults);
			results.region = allYelpResults[i].region
			results.total += allYelpResults[i].total;
			results.businesses = results.businesses.concat(allYelpResults[i].businesses)
		}
		res.render('index', {allYelpResults: {results:results} })
		// res.render('search', {allYelpResults:allYelpResults[0]})
	})
})
		
app.get('/about', function(req, res) {
	res.render('about')
})






app.listen(3000);