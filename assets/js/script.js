// current date
var currentDate = dayjs().format("DD/MM/YYYY");

// the search button
var searchButton = document.getElementById("search-button");

// the current weather card
var weatherCard = document.getElementById("today");

// click event listener on the search button
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

      // retrieves weather icon data
      // stack overflow help  
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      document.getElementById("wicon").src = iconurl;

      // convert the temp to celsius
      var tempC = data.main.temp - 273.15;
      document.getElementById("temp").textContent = "Temperature: " + tempC.toFixed(2) + " °C";
      
      // current weather card appear only after a user clicks on the search button when the api data is fetched
      weatherCard.style.display = "block";

      // adds the city to the search history
      addToSearchHistory(city);
    })
    .catch(function (error) {
      // display error with api request
      console.error('There was a problem with the fetch operation:', error);
    });
});
