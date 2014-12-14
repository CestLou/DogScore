var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
//all keys have a link to the ignored env file. as to not be included in github push!
var yelp = require("yelp").createClient({
  consumer_key: process.env.Dog_Key, 
  consumer_secret: process.env.Dog_Secret,
  token: process.env.Dog_Token,
  token_secret: process.env.Dog_Secret_Token
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));

// var db = require('./models')


app.get('/', function(req, res) {
	res.render('index')
});


app.get('/search', function(req, res) {
	yelp.search({term:"dog friendly", category_filter: "hotels,parks", location: "Seattle"}, function(error, data) {
	console.log(error);
	console.log(data);
	res.send(data);	
	});
	
})
// See http://www.yelp.com/developers/documentation/v2/search_api


app.listen(3000);