city = "Denver";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=718877f006fbc005e62f6fd566dd15ac";

function showWeather(city){

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
        console.log(response);
        console.log(response.data);
});
 
} 
showWeather(city);
//create a search button function for a city name
//

