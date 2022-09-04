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

    currentTimeEl.innerHTML = (hoursin12HrFormat < 10? '0'+hoursin12HrFormat : hoursin12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

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
        showWeatherData(data);
    })

    
}

function showWeatherData (data){
    let {humidity, uvi, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'


    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
    </div>
    <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
    <div>UV Index</div>
    <div>${uvi}</div>
    </div>`;
   

        let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = 
            `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
              <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <div class="temp">Day - ${day.temp.day}&#176; F</div>
              <div class="temp">Night - ${day.temp.night}&#176; F</div>
            </div>
            
            
            
            `
        }else{
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon"  class="w-icon">
                <div class="temp">Day - ${day.temp.day}&#176; F</div>
                <div class="temp">Night - ${day.temp.night}&#176; F</div>
          </div>`
        }
    })

    weatherForcastEl.innerHTML = otherDayForecast;
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