// current date
var currentDate = dayjs().format("DD/MM/YYYY");

// Get the search button element by its ID
var searchButton = document.getElementById("search-button");

// Add a click event listener to the search button
searchButton.addEventListener("click", function (event) {
  
  event.preventDefault();

  // value of the search input of user
  var city = document.getElementById("search-input").value;

  // api url using the city variable and the api key is in the api.js file
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
  // api request using fetch
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // update dom with data
      document.getElementById("city").textContent = data.name + " " + currentDate;
      document.getElementById("wind").textContent = "Wind: " + data.wind.speed + " KPH";
      document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";

      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      document.getElementById("wicon").src = iconurl;

      // convert the temp to celsius
      var tempC = data.main.temp - 273.15;
      document.getElementById("temp").textContent = "Temperature: " + tempC.toFixed(2) + " °C";
    })
    .catch(function (error) {
      // display error with api request
      console.error('There was a problem with the fetch operation:', error);
    });
});
