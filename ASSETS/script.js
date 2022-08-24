// var key = 'dc6aecf9ea650a1c2b46756189ec4024' 
var key = '4ba263fc479a8029bd0bd9180e26bba2'
var url = "https://api.openweathermap.org/data/2.5/weather?q="
var city = document.querySelector("#city")
var searchBtn = document.querySelector("#srch-button")
var todayDateEl = document.getElementById('date');
var currentTimeEl = document.getElementById('time');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timezone = document.getElementById('time-zone');
var countryEl = document.getElementById('location');
var weatherForcastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(()=> {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var hoursin12HrFormat = hour > 13 ? hour %12: hour;
    var minutes = time.getMinutes();
    var ampm = hour >=12 ? 'PM' : 'AM'

    currentTimeEl.innerHTML = hoursin12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    todayDateEl.innerHTML  = days[day] + ', ' + date + ' ' + months[month]

}, 1000);


function weatherSearch() {
    fetch(url + city.value + '&units=imperial&APPID=' + key)
    .then(function (response) {
       return response.json();  
    }) 
    .then(function (data) {
      getWeeklyWeather(data);
    })
}
function getWeeklyWeather(data) {
    var openCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,alerts,minutely&units=imperial&APPID=' + key;
    fetch(openCall)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}

searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    weatherSearch();
     var pastSearches = localStorage.getItem('pastSearches');
     if (pastSearches == undefined) {
         var recentSearch = [city.value]
         localStorage.setItem('pastSearches', JSON.stringify(recentSearch));
     } else {
         var storedInfo = JSON.parse(pastSearches);
         storedInfo.push(city.value);
         localStorage.setItem('pastSearches', JSON.stringify(storedInfo));
     }

 })






/**
 * TO DO: Get the weather information for current to display on the page.
 * TO DO: Get the weekly forcase to display on the page. 
 * TO DO: If no city is searched, don't save to local storage & don't run function.
 * TO DO: Get past searches to display on page when the page itself loads. 
 * TO DO: If the city doesn't exist, don't run function. 
 * TO DO: Change API Key back to mine. 
 * LAST TO DO: Double check criteria & make sure all square. 
 *
 */