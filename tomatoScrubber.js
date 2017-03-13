// get dataset for movies in the last 20 years

var http = require("https");
var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('tomatoURLs.csv'),
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
            var regex = /<span class="meter-value superPageFontColor"><span>\d+<\/span>%<\/span>/;
            var result = regex.exec(body.toString());
            if (result != null)
            {
                var score = result[0].replace('<span class="meter-value superPageFontColor"><span>', "").replace('</span>%</span>', '');
                console.log(parts[0] + " " + score);
                fs.appendFileSync('result.csv', parts[0] + "," + score + "\n");
            }
            else
            {
                fs.appendFileSync('result.csv', parts[0] + "," + "bad tomato url\n");
                console.log(parts[0] + " " + "unknown")
            }
        });
    });
});