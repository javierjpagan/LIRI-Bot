require("dotenv").config();

var fs = require("fs");
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

// =====================================================================================================


app(process.argv[2], process.argv[3]);


// =====================================================================================================

function app(command, params) {

    switch (command) {
        case "concert-this":
            bandInfo(params);
            break;

        case "spotify-this-song":
            songInfo(params);
            break;

        case "movie-this":
            movieInfo(params);
            break;

        case "do-what-it-says":
            doIt();
            break;

        default:
            "Liri does not know that command.  Please try again";
            break;
    }
}



//Spotify
// var spotify = new Spotify(keys.spotify);

// spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function (error, songResponse) {
//     if (error) {
//         return console.log(error);
//     }
//     console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
//     console.log("Song: " + songResponse.tracks.items[0].name);
//     console.log("URL: " + songResponse.tracks.items[0].preview_url);
//     console.log("Album: " + songResponse.tracks.items[0].album.name);
// });


function bandInfo(bandName) {

    //Bands in Town
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (bandResponse) {
            for (let i = 0; i < bandResponse.data.length; i++) {
                let show = bandResponse.data[i];

                console.log("Venue: " + show.venue.name);
                console.log("City: " + show.venue.city);
                console.log(moment(show.datetime).format("MM/DD/YYYY"));
                console.log("===============================================================");
            }
        }
    );
};

function songInfo() {
    var songName = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            songName = songName + "+" + userInput[i];
        } else {
            songName += userInput[i];
        }
    }
}

function movieInfo(movieName) {

    //Movie Search
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (movieResponse) {
            console.log("Title: " + movieResponse.data.Title);
            console.log("Year: " + movieResponse.data.Year);
            console.log("Rated: " + movieResponse.data.imdbRating);
            console.log("Country: " + movieResponse.data.Country);
            console.log("Language: " + movieResponse.data.Language);
            console.log("Plot: " + movieResponse.data.Plot);
            console.log("Actors: " + movieResponse.data.Actors);
            console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
        }
    );
}

function doIt() {
    let command;
    let params;
    fs.readFile("random.txt", "ütf8", function (error, data) {
        if(error) throw error;

        var dataArray = data.split(",");

        for (let i = 0; i < dataArray.length; i++) {
            command = dataArray[i];
            i++;
            params = dataArray[i];
            app(command, params);
        }
        
    })
}