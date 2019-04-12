// requiring dotenv to retrieve keys
require("dotenv").config();

// grabbing fs package to allow us to append searches to random.txt
var fs = require("fs");

// setting up Spotify variables
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// setting up BandsInTown variables
var axios = require("axios");

// requiring moment,js
var moment = require('moment');

// setting up search/argument variables
var argument = process.argv[2];
var search = process.argv.slice(3, process.argv.length).join(" ");


// setting up spotify search function

function spotifySearch() {

  spotify.search({ type: 'track', query: search }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data);
    var spotifySearchResult = data.tracks.items[0];
    // console.log(spotifySearchResult);
    for (i = 0; i < spotifySearchResult.artists.length; i++) {
      console.log("----------Song Info----------")
      console.log("Artist(s): " + spotifySearchResult.artists[i].name);
      console.log("Song Name: " + spotifySearchResult.name);
      console.log("Preview Link: " + spotifySearchResult.preview_url);
      console.log("Album: " + spotifySearchResult.album.name);
      console.log("---------------------------------");
    }
  });

}

// setting up bandsintown search

function bandsSearch() {

  var artist = search;

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {
      for (i = 0; i < response.data.length; i++) {
        console.log("----------Event Info----------");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
        console.log("Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        console.log("---------------------------------");
      }
    }
  );
}

// appending the argument and search to random.txt
fs.appendFile("random.txt", "\n" + argument + ", " + search, function (err) {
  if (err) {
    console.log(err);
  }

});

// switch case to detect which argument was entered
switch (argument) {
  case "spotify-this-song":
    spotifySearch();
    break;

  // case "movie-this":
  // omdbSearch();
  // break;

  case "concert-this":
    bandsSearch();
    break;
}


