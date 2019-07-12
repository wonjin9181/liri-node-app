require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment")
var axios = require("axios")
var fs = require("fs")


var action = process.argv[2]

var input;

console.log(action)

switch (action) {

    case "concert-this":
        getConcert();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doIt();
        break;
}


function getConcert() {

    input = process.argv[3]
    console.log(process.argv[3])

    queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {
            // console.log('\n--------', response.data[0])
            console.log("Name of the Venue: " + response.data[0].venue.name)
            console.log("City of the Venue: " + response.data[0].venue.city);
            console.log("Date of the Event: " + moment(response.data[0].datetime).format('L'))
        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Headers---------------");
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}

function spotifySong() {

    if (process.argv[3] !== "") {
        input = process.argv[3];
    }

    if (!process.argv[3]) {
        input = "the sign"
    }

    console.log(input)

    spotify
        .search({ type: 'track', query: input, limit: 1 })

        .then(function (response) {
            // console.log(response.tracks.items[0]);
            console.log("=======================")
            // console.log(response.tracks.items[0].artists);
            // console.log("=======================")
            console.log(response.tracks.items[0].artists[0].name);
            console.log("=======================")
            console.log(response.tracks.items[0].name);
            console.log("=======================")
            console.log(response.tracks.items[0].preview_url);
            console.log("=======================")
            console.log(response.tracks.items[0].album.name);
        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Headers---------------");
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function movieThis() {

    if (process.argv[3] !== "") {
        input = process.argv[3];
    }
    if (!process.argv[3]) {
        input = "Mr. Nobody"
    }


    queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data)
            console.log("==============")
            console.log("Title: " + response.data.Title)
            console.log("==============")
            console.log("Release Year: " + response.data.Year);
            console.log("==============")
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            console.log("==============")
            console.log("Rotten T. Rating: " + response.data.Ratings[0].Value)
            console.log("==============")
            console.log("Country: " + response.data.Country)
            console.log("==============")
            console.log("Language: " + response.data.Language)
            console.log("==============")
            console.log("Plot: " + response.data.Plot)
            console.log("==============")
            console.log("Actors: " + response.data.Actors)
        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Headers---------------");
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        dataArr = data.split(',')
        console.log(dataArr)

        action = dataArr[0];
        process.argv[3] = dataArr[1];

        switch (action) {

            case "concert-this":
                getConcert();
                break;

            case "spotify-this-song":
                spotifySong();
                break;

            case "movie-this":
                movieThis();
                break;
        }
    })
}