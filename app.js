const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {


    const query = req.body.cityName;
    const apiKey = "b36086b7a95afe577264288027aeb0fc";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon


            res.write("<p>Weather is currently " + weatherDescription + " </p>")
            res.write("<h1>The temperature in " + query + " is " + temp + " Celcius.</h1>")
            res.send()
        })
    });
});




app.listen(3000, function() {
    console.log("Server is running on port 3000 : ");
});