// requiring dotenv to retrieve keys
require("dotenv").config();

// grabbing fs package to allow us to append searches to random.txt
var fs = require("fs");

// setting up Spotify variables
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// setting up BandsInTown/Omdb variables
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
      console.log("\n Here are upcoming event details for " + artist + "...\n")
      for (i = 0; i < response.data.length; i++) {
        console.log("----------Event Info----------" + "\n");
        console.log("\033[38;5;6m" + "Venue Name: " + "\033[0m" + response.data[i].venue.name);
        console.log("\033[38;5;6m" + "Venue Location: " + "\033[0m" + response.data[i].venue.city + ", " + response.data[i].venue.region);
        console.log("\033[38;5;6m" + "Date of event: " + "\033[0m" + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
        console.log("-------------------------------");
      }
    }
  );
}

function omdbSearch() {
  var movie = search;
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log("\n Here are the details for " + movie + "...\n");
      console.log("----------Movie Info----------" + "\n");
      console.log("\033[38;5;6m" + "Title: " + "\033[0m" + response.data.Title);
      console.log("\033[38;5;6m" + "Released Date: " + "\033[0m" + response.data.Released);
      console.log("\033[38;5;6m" + "IMDB Rating: " + "\033[0m" + response.data.imdbRating);
      console.log("\033[38;5;6m" + "Rotten Tomatoes Rating: " + "\033[0m" + response.data.Ratings[1].Value);
      console.log("\033[38;5;6m" + "Country: " + "\033[0m" + response.data.Country);
      console.log("\033[38;5;6m" + "Language(s): " + "\033[0m" + response.data.Language);
      console.log("\033[38;5;6m" + "Plot: " + "\033[0m" + response.data.Plo);
      console.log("\033[38;5;6m" + "Actors: " + "\033[0m" + response.data.Actors + "\n");
      console.log("------------------------------");
      // * Title of the movie.
      // * Year the movie came out.
      // * IMDB Rating of the movie.
      // * Rotten Tomatoes Rating of the movie.
      // * Country where the movie was produced.
      // * Language of the movie.
      // * Plot of the movie.
      // * Actors in the movie.
    }
  );
}

function nullCase() {
  console.log("\n" + "\033[38;5;9m" + "Command not found. Type 'node liri.js help' for more information");
}

function help() {
  console.log(
  "\n" +
  "STRUCTURE" +
  "\033[38;5;6m" + "\n  node liri.js (command) + (search(artist, concert, movie))\n" + "\033[0m" + 
  "\nCOMMAND OPTIONS" + 
  "\033[38;5;10m" +
  "\n  spotify-this-song" + "\033[0m" + "     search for artist details" +
  "\033[38;5;10m" +
  "\n  concert-this" + "\033[0m" + "          search for concert details" +
  "\033[38;5;10m" +
  "\n  movie-this" + "\033[0m" + "            search for movie details"
  )
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

  case "movie-this":
    omdbSearch();
    break;

  case "concert-this":
    bandsSearch();
    break;

  case "help":
    help();
    break;

  default:
    nullCase();
}



