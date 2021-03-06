//global variables for local storage
var city = "";
var searched = [];
//button function for previous searches to display
function createButton(city) {
  var button = $("<button>").text(city).attr("id", city).attr("class", "searchBtn");
  $("#button-here").append(button);
};
//one function that loops through all the cities in the array and renders buttons
  // creating a click event for the previous searches
  $("#submit").on("click", function(e) {
    e.preventDefault();
    city = $("#input-type").val();
    searched.push(city); //unshift
    CitySearch(city);
    createButton(city);
  });

//creating the function to call city info
function CitySearch(city) {
  city = $("#input-type").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=718877f006fbc005e62f6fd566dd15ac";

  $.ajax({
    url: queryURL,
    method: "GET",
    //setting local storage
    success: function () {
      localStorage.setItem("searchHistory", JSON.stringify(searched));
    },
  }).then(function (response) {
    //not allowing the page to have more than one city search at a time
    $(".weather-conditions").empty();
    console.log(response);
    //creating current date
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var name = $("<h1>").text(city).css("textTransform", "capitalize");
    var temp = response.main.temp;
    var tempF = Math.round((temp - 273.15) * 1.8 + 32);
    var wind = response.wind.speed;
    var icon = response.weather[0].icon;
    var humidity = response.main.humidity;
    var tempTag = $("<li>").text("Temperature: " + tempF + " degrees F");
    var windTag = $("<li>").text("Wind Speed: " + wind + " MPH");
    var humidTag = $("<li>").text("Humidity: " + humidity);
    var img = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/w/" + icon + ".png"
    );
    var row = $(".weather-conditions");
    var first = $(".weather-conditions")
      .append(name)
      .append(date)
      .append(img)
      .append(tempTag)
      .append(windTag)
      .append(humidTag);
    //pulling coordinates from response
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var queryUV =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=718877f006fbc005e62f6fd566dd15ac";
    $.ajax({
      url: queryUV,
      method: "GET",
    }).then(function (response) {
      $("<li>").empty();
      console.log(response);
      var uvIndex = response.value;
      var uvTag = $("<li>").text("UV Index: " + uvIndex);

      //creating uv values to append specific uv levels
      if (response.value < 2) {
        uvTag.addClass(uvTag.css("background-color", "green"));
      } else if (response.value < 5 && response.value > 2) {
        uvTag.addClass(uvTag.css("background-color", "yellow"));
      } else if (response.value < 7 && response.value > 5) {
        uvTag.addClass(uvTag.css("background-color", "orange"));
      } else if (response.value < 10 && response.value > 7) {
        uvTag.addClass(uvTag.css("background-color", "red"));
      } else {
        uvTag.addClass(uvTag.css("background-color", "pink"));
      }
      first.append(uvTag);
    });
  });

  // 5 day forecast

  var queryForecast =
    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    city +
    "&cnt=6&appid=166a433c57516f51dfab1f7edaed8413";
  $.ajax({
    url: queryForecast,
    method: "GET",
  }).then(function (response) {
    $("#day" + i).empty();
    console.log(response);
    for (i = 0; i < 6; i++) {
      //not allowing more than one city to be displayed at time again
      $("#day").empty();
      var dayIndex = [i];
      var icon = response.list[dayIndex].weather[0].icon;
      var img = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + icon + ".png"
      );
      var tempForecast = response.list[dayIndex].temp.day;
      var tempF = Math.round((tempForecast - 273.15) * 1.8 + 32);
      var humidity = response.list[dayIndex].humidity;

      var dt = response.list[dayIndex].dt;
      var date = dt * 1000;
      var dateFormat = new Date(date);
      var dateDisplay = dateFormat.toLocaleString();

      var tempTag = $("<li>")
        .text("Temperature: " + tempF + " degrees F")
        .css("fontSize", "15px");
      var humidTag = $("<li>")
        .text("Humidity: " + humidity)
        .css("fontSize", "15px");

      $("#day" + i)
        .html(img)
        .append(dateDisplay)
        .append(tempTag)
        .append(humidTag);
    }
  });
}
$("#button-here").on("click", function(e){
  e.preventDefault();
  console.log("click");
  var searchTerm = $(this).attr("class id");
  CitySearch(searchTerm);
  console.log(searchTerm);
})

// creating history variable to log into local storage
var storage = JSON.parse(localStorage.getItem("searchHistory"));
if (storage) {
  $("#button-here").empty();
  for (var i = 0; i < storage.length; i++) {
    createButton(storage[i]);
    console.log(storage)
  }
} 
