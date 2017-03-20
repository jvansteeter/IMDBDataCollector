// get dataset for movies in the last 20 years

var http = require("http");
var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('mojoURLs2007.csv'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line)
{
    var parts = line.split(',');
    http.get(parts[1], function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var record = "";
            var genre, MPAA, budget, director, producer, composer;
            var actors = [];

            var genreReg = /Genre: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
            if (genreReg != null)
            {

                genre = genreReg[0].replace('Genre: <b>', "");
            }
            else
            {
                genre = "unknown";
            }

            var mpaaRegex = /MPAA Rating: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
            if (mpaaRegex != null)
            {

                MPAA = mpaaRegex[0].replace('MPAA Rating: <b>', "");
            }
            else
            {
                MPAA = "unknown";
            }

            var budgetRegex = /Production Budget: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
            if (budgetRegex != null)
            {

                budget = budgetRegex[0].replace('Production Budget: <b>', "");
            }
            else
            {
                budget = "unknown";
            }

            var directorRegex = /Director(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">)?[\w\s.]+/.exec(body.toString());
            if (directorRegex != null)
            {

                director = directorRegex[0].replace(/Director(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">)?/, "");
            }
            else
            {
                director = "unknown";
            }

            var producerRegex = /Producer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">)?[\w\s.]+/.exec(body.toString());
            if (producerRegex != null)
            {

                producer = producerRegex[0].replace(/Producer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">)?/, "");
            }
            else
            {
                producer = "unknown";
            }

            var composerRegex = /Composer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">)?[\w\s.]+/.exec(body.toString());
            if (composerRegex != null)
            {

                composer = composerRegex[0].replace(/Composer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">)?/, "");
            }
            else
            {
                composer = "unknown";
            }


            record = parts[0] + ',' + genre + ',' + MPAA + ',' + budget + ',' + director + ',' + producer + ',' + composer + '\n';
            fs.appendFileSync("mojoresult.csv", record);
        });
    });
});

// http.get("http://www.boxofficemojo.com/movies/?id=starwars2016.htm", function (res) {
// http.get("http://www.boxofficemojo.com/movies/?id=deadpool2016.htm", function (res) {
//     var chunks = [];
//
//     res.on("data", function (chunk) {
//         chunks.push(chunk);
//     });
//
//     res.on("end", function () {
//         var body = Buffer.concat(chunks);
//         var genre, MPAA, budget, director, producer, composer;
//         var actors = [];
//
//         var genreReg = /Genre: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
//         if (genreReg != null)
//         {
//
//             genre = genreReg[0].replace('Genre: <b>', "");
//             console.log(genre);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var mpaaRegex = /MPAA Rating: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
//         if (mpaaRegex != null)
//         {
//
//             MPAA = mpaaRegex[0].replace('MPAA Rating: <b>', "");
//             console.log(MPAA);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var budgetRegex = /Production Budget: <b>[A-Za-z0-9\-!@#$%^&*(),.?'":;\s]*/.exec(body.toString());
//         if (budgetRegex != null)
//         {
//
//             budget = budgetRegex[0].replace('Production Budget: <b>', "");
//             console.log(budget);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var directorRegex = /Director(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">)?[\w\s]+/.exec(body.toString());
//         if (directorRegex != null)
//         {
//
//             director = directorRegex[0].replace(/Director(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Director[\w\/?=&^>]*\.htm">)?/, "");
//             console.log(director);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var producerRegex = /Producer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">)?[\w\s]+/.exec(body.toString());
//         if (producerRegex != null)
//         {
//
//             producer = producerRegex[0].replace(/Producer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Producer[\w\/?=&^>]*\.htm">)?/, "");
//             console.log(producer);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var composerRegex = /Composer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">)?[\w\s]+/.exec(body.toString());
//         if (composerRegex != null)
//         {
//
//             composer = composerRegex[0].replace(/Composer(s)?:[^\s]*<font size="2">(<a href="[\w\/?=&]*Composer[\w\/?=&^>]*\.htm">)?/, "");
//             console.log(composer);
//         }
//         else
//         {
//             console.log("unknown")
//         }
//
//         var actorRegex = /[^.]*<a href="[\w\/?=&]*Actor[\w\/?=&^>]*\.htm">[\w\s]+/gi;
//         var result;
//         while (result = actorRegex.exec(body.toString()))
//         {
//             console.log(actorRegex);
//             if (result != null)
//             {
//
//                 actors.push(result[0].replace(/[^.]*<a href="[\w\/?=&]*Actor[\w\/?=&^>]*\.htm">/, ""));
//                 console.log(actors);
//             }
//             else
//             {
//                 console.log("unknown")
//             }
//         }
//         actors.splice(0,1);
//         console.log(actors);
        // console.log("done");
    // });
// });