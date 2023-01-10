const rwClient = require("./TwitterClient.js");
var Twitter = require("twitter");



/*var Twitclient = new Twitter({
    consumer_key: '<CONSUMER-KEY>',
    consumer_secret: '<CONSUMER-SECRET>',
    access_token_key: '<ACCESS-TOKEN-KEY>',
    access_token_secret: 'ACCESS-TOKEN-SECRET',
    })
*/

function tweet() {
    rwClient.v2.tweet('#HASHTAG')
}


var params = {screen_name: 'NAME' }

/*Twitclient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
        console.log(error);
    }
});*/

function search() {
    const techTweets = rwClient.v2.searchAll('#HASHTAG');
    console.log(techTweets)
}
response = "HASHTAG";
console.log(response)

