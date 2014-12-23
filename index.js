var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
//all keys need to have a link to the ignored env file. as to not be included in github push!
var yelp = require("yelp").createClient({
	consumer_key: process.env.woof_key,
  	consumer_secret: process.env.woof_secret,
  	token: process.env.woof_token,
  	token_secret: process.env.woof_token_secret});
var async = require('async');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))


// Where the search occurs
app.get('/', function(req, res) {
	var allYelpResults = []
	var searchTerms = (req.query.searchParams && req.query.searchParams.constructor === String ) ?  new Array(req.query.searchParams) : req.query.searchParams;
	searchTerms = searchTerms || ['dog_parks']

	async.each(searchTerms, function(searchTerm, callback) {
		//Do this for each searchTerm
		var location = "";
		if (req.query.location === undefined) {
			location = "Seattle, WA";
		} else {
			location = req.query.location;
		}
		yelp.search({term:"dog friendly", category_filter: searchTerm, location: location}, function(err,data) {
			allYelpResults.push(data)
			callback(err);
		});
	},function(err) {
		var results = {total:0, businesses:[], region:{}};
		for (var i=0; i < allYelpResults.length; i++) {
			results.region = allYelpResults[i].region
			results.total += allYelpResults[i].total;
			results.businesses = results.businesses.concat(allYelpResults[i].businesses)
		}
		if(req.query.json && req.query.json=='true'){
			res.send({results:results});
		}else{
			res.render('index', {allYelpResults: {results:results} })	
		}		
	})
})
		




app.listen(process.env.PORT || 3000, function() {
  console.log("I'm listening...");
});