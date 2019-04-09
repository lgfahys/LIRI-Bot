// requiring dotenv to retrieve keys
require("dotenv").config();

// // grabbing fs package to allow us to append searches to random.txt
var fs = require("fs");

// // setting up Spotify variables
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var argument = process.argv[2];
var search = process.argv.slice(3, process.argv.length).join("+");


// // setting up spotify search function

function spotifySearch() {

  spotify.search({ type: 'track', query: search}, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data);
    var spotifySearchResult = data.tracks.items[0];
    for(i=0; i<spotifySearchResult.artists.length; i++){
    console.log("Artist(s): " + spotifySearchResult.artists[i].name); 
    console.log("Song Name: " + spotifySearchResult.name);
  	console.log("Preview Link: " + spotifySearchResult.preview_url);
    console.log("Album: " + spotifySearchResult.album.name);
  }
  });

}

switch (argument) {
  case "spotify-this-song":
  spotifySearch();
  break;

  // case "movie-this":
  // omdbSearch();
  // break;

  // case "concert-this":
  // bandsSearch();
  // break;
}


