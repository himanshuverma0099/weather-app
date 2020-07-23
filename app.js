//jshint esversion:6
const express = require("express");

const bodyParser = require("body-parser");
const request = require('request');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine','ejs')
app.get("/", function (req, res) {
    res.render('index', {
        name: null,
        long: null,
        latt: null,
        count: null,
        temp: null,
        mint: null,
        maxt: null,
        pres: null,
        hum: null,
        winds: null,
        windd: null,
        wed: null,
        img: null,
        error: null
    });
})
app.post("/", function (req, res) {
    const cityname = req.body.n1;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=65d08118809958adc449ef304823204a";
    request(url, function (err,response,body) {
        if(err){
            res.render('index', {
                name: null,
                long: null,
                latt: null,
                count: null,
                temp: null,
                mint: null,
                maxt: null,
                pres: null,
                hum: null,
                winds: null,
                windd: null,
                wed: null,
                img: null,
                error: 'Error, Please try again'
                });
            }
        else{
            const wdata = JSON.parse(body);
            if(wdata.main==undefined){
                res.render('index',{name:null,error:'Error'});
            }
        else{
            const name = wdata.name;
                const long = wdata.coord.lon;
                const latt = wdata.coord.lat;
                const country = wdata.sys.country;                    const temp = wdata.main.temp;
                const min_temp = wdata.main.temp_min;
                const max_temp = wdata.main.temp_max;
                const pressure = wdata.main.pressure;
                const humidity = wdata.main.humidity;
                const windspeed = wdata.wind.speed*18/5;
                const winddegree = wdata.wind.deg;
                console.log(name);
                console.log(temp);
                const wed = wdata.weather[0].description
                const icon = wdata.weather[0].icon
                //console.log(wed);
                const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.render('index', {
                    name: name,
                    long: long,
                    latt: latt,
                    count: country,
                    temp: temp,
                    mint: min_temp,
                    maxt: max_temp,
                    pres: pressure,
                    hum: humidity,
                    winds: windspeed,
                    windd: winddegree,
                    wed: wed,
                    img: imgURL,
                    error: null
                });
            }
            //console.log(wdata);                
        }    
    })
})

app.listen(3000, function () {
    console.log("Server is Running on 3000.");
})