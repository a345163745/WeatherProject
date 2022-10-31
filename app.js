const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post('/',(req,res)=>{
    const cityName = req.body.cityName;
    const appId = req.body.appId;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=metric`
    https.get(URL,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>${cityName} is now ${temp} degrees</h1>`);
            res.write(`<img src=${imageURL}>`);
            res.send();
        })
    })
})

// const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=91139a8678b12ea11347d7cfa55ef057&units=metric "
//     https.get(url,(response)=>{
//         console.log(response.statusCode)
//         response.on("data",(data)=>{
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const weatherDescription = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
//             res.write(`<p>The weather description for london is ${weatherDescription}</p>`);
//             res.write(`<h1>The weather for london is ${temp} degrees Celcius</h1>`)
//             res.write(`<img src= ${imgURL}>`)
//             res.send();
//         })
//     })
    

app.listen(3000,()=>{
    console.log("running on 3000 server...");
});