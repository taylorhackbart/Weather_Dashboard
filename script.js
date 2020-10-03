var city = "Denver";
var searchBtn = $("submit");
var userInput = $("input");

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=718877f006fbc005e62f6fd566dd15ac";

function showWeather(){

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
        console.log(response);
        console.log(response.city);
        console.log(response.list[0].main.temp)
        console.log(response.list[0].weather)
        console.log(response.list[0].wind.speed);
        console.log(response.list[0].main.humidity);
        console.log(response.list[0].weather[0].description);
        console.log(response.list[0].weather[0].icon)
        var row = $(".weather-conditions");
        var temp = (response.list[0].main.temp)
        var tempF = (temp - 273.15) * 1.80 + 32
        console.log(tempF);
        var cityName = $(".cityname").text(response.city);
        var wind = $("#wind").text(response.list[0].wind.speed)
        var humidity = $("#humidity").text(response.list[0].main.humidity);
        var tempDiv = $("#temp").append(tempF)
        $("tbody").append(row).append(tempDiv).append(cityName).append(wind).append(humidity);

});
 
} 
showWeather();
//create a search button function for a city name
//
searchBtn.on("click", function(e){
    e.preventDefault();
    console.log()
})

// 5 day forecast
var queryForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=718877f006fbc005e62f6fd566dd15ac"
$.ajax({
    url: queryForecast,
    method: "GET"
  }).then(function(response) { 
   console.log(response);
   console.log(response.city);
   console.log(response.list[0].main.temp)
   console.log(response.list[0].weather)
   console.log(response.list[0].wind.speed);
   console.log(response.list[0].main.humidity);
   console.log(response.list[0].weather[0].description);
   console.log(response.list[0].weather[0].icon)

    console.log(response);
    console.log(response.city);
    console.log(response.list[1].main.temp)
    console.log(response.list[1].weather)
    console.log(response.list[1].wind.speed);
    console.log(response.list[1].main.humidity);
    console.log(response.list[1].weather[0].description);
    console.log(response.list[1].weather[0].icon)

    console.log(response);
    console.log(response.city);
    console.log(response.list[2].main.temp)
    console.log(response.list[2].weather)
    console.log(response.list[2].wind.speed);
    console.log(response.list[2].main.humidity);
    console.log(response.list[2].weather[0].description);
    console.log(response.list[2].weather[0].icon)

    console.log(response);
    console.log(response.city);
    console.log(response.list[3].main.temp)
    console.log(response.list[3].weather)
    console.log(response.list[3].wind.speed);
    console.log(response.list[3].main.humidity);
    console.log(response.list[3].weather[0].description);
    console.log(response.list[3].weather[0].icon)

    console.log(response);
    console.log(response.city);
    console.log(response.list[4].main.temp)
    console.log(response.list[4].weather)
    console.log(response.list[4].wind.speed);
    console.log(response.list[4].main.humidity);
    console.log(response.list[4].weather[0].description);
    console.log(response.list[4].weather[0].icon)
  });