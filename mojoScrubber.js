// get dataset for movies in the last 20 years

var http = require("http");
var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('mojoURLs.csv'),
    output: process.stdout,
    console: false
});

// rd.on('line', function(line)
// {
//     var parts = line.split(',');
//     http.get(parts[1], function (res) {
//         var chunks = [];
//
//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//         });
//
//         res.on("end", function () {
//             var body = Buffer.concat(chunks);
//             var genre, MPAA, budget, director, producer, composer;
//             var actors = [];
//
//             var genreReg = /Genre: <b>[A-Za-z0-9\-!@#$%^&*()\s]*/.exec(body.toString());
//
//             if (genreReg != null)
//             {
//
//                 genre = genreReg[0].replace('Genre: <b>', "");
//                 console.log(genre);
//             }
//             else
//             {
//                 console.log("unknown")
//             }
//         });
//     });
// });
//
http.get("http://www.boxofficemojo.com/movies/?id=starwars2016.htm", function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        var genre, MPAA, budget, director, producer, composer;
        var actors = [];

        var genreReg = /Genre: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
        if (genreReg != null)
        {

            genre = genreReg[0].replace('Genre: <b>', "");
            console.log(genre);
        }
        else
        {
            console.log("unknown")
        }

        var mpaaRegex = /MPAA Rating: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
        if (mpaaRegex != null)
        {

            MPAA = mpaaRegex[0].replace('MPAA Rating: <b>', "");
            console.log(MPAA);
        }
        else
        {
            console.log("unknown")
        }

        var budgetRegex = /Production Budget: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
        if (budgetRegex != null)
        {

            budget = budgetRegex[0].replace('Production Budget: <b>', "");
            console.log(budget);
        }
        else
        {
            console.log("unknown")
        }

        var directorRegex = /Director:.*<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">[\w\s]+/.exec(body.toString());
        if (directorRegex != null)
        {

            director = directorRegex[0].replace(/Director:.*<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">/, "");
            console.log(director);
        }
        else
        {
            console.log("unknown")
        }

        var producerRegex = /Producer:.*<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">[\w\s]+/.exec(body.toString());
        if (producerRegex != null)
        {

            producer = producerRegex[0].replace(/Producer:.*<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">/, "");
            console.log(producer);
        }
        else
        {
            console.log("unknown")
        }

        var composerRegex = /Composer:.*<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">[\w\s]+/.exec(body.toString());
        if (composerRegex != null)
        {

            composer = composerRegex[0].replace(/Composer:.*<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">/, "");
            console.log(composer);
        }
        else
        {
            console.log("unknown")
        }

        var actorRegex = /Actors:.*<a href="[\w\/?=&]*Actor[\w\/?=&^>]*\.htm">[\w\s]+/.exec(body.toString());
        console.log(actorRegex);
        if (actorRegex != null)
        {

            var actor = actorRegex[0].replace(/Actors:.*<a href="[\w\/?=&]*Actor[\w\/?=&^>]*\.htm">/, "");
            console.log(actor);
        }
        else
        {
            console.log("unknown")
        }
        console.log("done");
    });
});