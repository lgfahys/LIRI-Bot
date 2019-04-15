# LIRI-Bot

## Description ##
LIRI-Bot is a language interpreter application using node.js. LIRI-Bot allows users to interact with the CLI and search for information on specific songs, artists and movies. 

## Instructions ##
### Structure ###
node liri.js (command) + (search(song, artist, movie)
### Command Options ###
- ***spotify-this-song*** + song name
  - LIRI-Bot will return artist(s), song name, a preview link and the album name for the song searched.
- ***concert-this*** + artist name
  - LIRI-Bot will return venue name(s), venue location(s), and date of event(s) for all upcoming events related to the artist searched.
- ***movie-this*** + movie name
  - LIRI-Bot will return the movie title, released date, IMDB Rating, Rotten Tomatoes Rating, Country, Language(s), Plot and Actors related to the movie searched.
- ***do-what-it-says***
  - LIRI-Bot will read from "random.txt" and run a search based on what is read.
- ***help***
  - LIRI-Bot will provide the user with instructions and examples on how to search using the CLI.

## Technologies & API's used ###
- [Node.js](https://nodejs.org/en/ "Node.js")
- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api "Node-Spotify-API")
- [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api "Bands In Town API")
- [OMDB API](http://www.omdbapi.com "OMDB API")
- [Axios](https://www.npmjs.com/package/axios "Axios") 
  - Used to grab data from the OMDB API and the Bands In Town API
- [Moment.js](https://www.npmjs.com/package/axios "Axios")
  - Used to format date/time to "MM/DD/YYYY"


