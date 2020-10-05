$("#submit").on("click", function(e){
  e.preventDefault();
  CitySearch();



function CitySearch(){
  var city=  $("#input-type").val()
  console.log(city)
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=718877f006fbc005e62f6fd566dd15ac"
  $.ajax({
   url: queryURL,
   method: "GET"
   }).then(function(response){
       console.log(response);
       var temp = response.main.temp;
       var tempF = (temp - 273.15) * 1.8 + 32;
       console.log(tempF);
       var cityName = $("<h1>").text(response.city);
       var wind = $("<td>").text(response.main.wind.speed);
       var tempTag = $("<td>").text(response.main.tempF);
       var humidity = $("<td>").text(response.main.humidity);
       var weatherDiv = $(".weather-conditions");
       weatherDiv.append(tempTag).append(cityName).append(wind);
   })


var queryForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=718877f006fbc005e62f6fd566dd15ac"

// 5 day forecast
var queryForecast =
  "http://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=718877f006fbc005e62f6fd566dd15ac";
$.ajax({
  url: queryForecast,
  method: "GET",
}).then(function (response) {
  for (i=0; i<5; i++){
  var dayIndex = [i];
  var day1=(response.list[dayIndex]);
  var tempForecast=(response.list[dayIndex].temp);
  var tempF = (tempForecast - 273.15) * 1.8 + 32;

}
  
 
});
}
})