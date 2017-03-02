// get dataset for movies in the last 20 years

var http = require("https");
var sleep = require("sleep");

var requests = 0;
var requestLimit = function()
{
    requests++;
    if (requests == 40)
    {
        sleep.sleep(10);
        requests = 0;
    }
};

var getYear = function (year)
{
    var results = [];
    getYearPage(year, 1, [], function(result)
    {
        results = result;
        return results;
    });
};

var getYearPage = function(year, page, result, callback)
{
    var ids = [];
    console.log(page);
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/discover/movie?primary_release_year=" + year + "&page=" + page + "&include_video=false&include_adult=false&sort_by=revenue.desc&language=en-US&api_key=9c92557c21914380726486bce02fbfbd",
        "headers": {}
    };

    requestLimit();
    var req = http.request(options, function (res)
    {
        var chunks = [];

        res.on("data", function (chunk)
        {
            chunks.push(chunk);
        });

        res.on("end", function ()
        {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            var json = JSON.parse(body.toString());
            for (var item in json.results)
            {
                ids.push(item.id);
            }
            for (var id in ids)
            {
                getDetails(id, function(json)
                {
                    if (json.hasOwnProperty("revenue") && json.revenue > 0)
                    {
                        console.log(json.title);
                        result.push(json);
                        getYearPage(year, page++, result, callback)
                    }
                    else
                    {
                        callback(result);
                        return;
                    }
                });
            }
        });
    });
    req.write("{}");
    req.end();
};

var getDetails = function(id, callback)
{
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/movie/" + id + "?language=en-US&api_key=9c92557c21914380726486bce02fbfbd",
        "headers": {}
    };

    requestLimit();
    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            // console.log(body.toString());

            callback(JSON.parse(body.toString()));
        });
    });

    req.write("{}");
    req.end();
};

console.log("BEGIN");
console.log(JSON.stringify(getYear(2016)), "\nEND");
