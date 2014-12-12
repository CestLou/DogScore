var yelp = require("yelp").createClient({
  consumer_key: "lA736NP1osOfTXudrMTfZw", 
  consumer_secret: "IW4ne8VDMbrWGSkPak9z2AZK_sk",
  token: "wvOx_MpAa1P6oBK4ASq-IlfzHgqFV5Lf",
  token_secret: "Kmi79-x8Ldc36uAwNM8SOnEuFm8"
});



// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "dog friendly", location: "Seattle"}, function(error, data) {
  console.log(error);
  console.log(data);
});
