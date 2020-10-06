$("#submit").on("click", function(e){
  e.preventDefault();
  CitySearch()

})

function CitySearch(){
  var city=  $("#input-type").val()
  console.log(city)
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=718877f006fbc005e62f6fd566dd15ac"
  var searchQuery = $("#prev-search").val();
  $("#previous").append("<li>"+ searchQuery + "</li>");
  

  $.ajax({
   url: queryURL + searchQuery,
   method: "GET"
   }).then(function(response){
       console.log(response);
       var today = new Date();
       var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
       var name = $("<h1>").text(city).css('textTransform', 'capitalize');
       var temp = (response.main.temp);
       var tempF = Math.round( (temp - 273.15) * 1.8 + 32 )
       var wind = (response.wind.speed);
       var icon = (response.weather[0].icon);
       var humidity = (response.main.humidity)
       var tempTag = $("<li>").text("Temperature: " + tempF + " degrees F")
       var windTag = $("<li>").text("Wind Speed: " + wind + " MPH")
       var humidTag = $("<li>").text("Humidity: " + humidity);
       var img= $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
       var row = $(".weather-conditions");
       var first= $(".weather-conditions").append(name).append(date).append(img).append(tempTag).append(windTag).append(humidTag);
       

      var lat = (response.coord.lat);
      var lon = (response.coord.lon);
 

var queryUV =  "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=718877f006fbc005e62f6fd566dd15ac"
       $.ajax({
         url: queryUV,
         method: "GET",
       }).then(function (response) {
       console.log(response);
       var uvIndex = response.value
       var uvTag = $("<li>").text("UV Index: " + uvIndex)
       console.log(uvIndex)
       first.append(uvTag);

       })  
   })
  

// 5 day forecast

var queryForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=166a433c57516f51dfab1f7edaed8413"
$.ajax({
  url: queryForecast,
  method: "GET",
}).then(function (response) {
  console.log(response);
   for (i=0; i<5; i++) {
    
    var dayIndex = [i]
    var icon = (response.list[dayIndex].weather[0].icon)
    var img= $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
    var tempForecast=(response.list[dayIndex].temp.day);
    var tempF = Math.round( (tempForecast - 273.15) * 1.8 + 32 )
    var humidity = response.list[dayIndex].humidity
    var date = response.list[dayIndex].dt;
    var tempTag = $("<li>").text("Temperature: " + tempF + " degrees F").css("fontSize", "15px");
    var humidTag = $("<li>").text("Humidity: " + humidity).css("fontSize", "15px");
    $("#day" + i).html(img).append(date).append(tempTag).append(humidTag);

   }
})

function storage(){
  
  $("#previous").append("<li>"+ searchQuery + "</li>");
  var searchHist = $("#input-type").innerText;
  console.log(searchHist);

  
}
} 
