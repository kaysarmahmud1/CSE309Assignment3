//gathering all the element through by get element by id

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

//now we need to update all our data
//first we will do it without the use of weather api
//using a setinterval function will be called after a particular interval till the interval is cleared
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//const API_KEY = '4a56f5f786f5452554fd6c63b1928d87';//my API KEY not working
//new api key
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
//for api we need to call the url which contains the lat, lon and path that we want to explore
//to call this api we will use a different fucntion


//this setInterval function is a call-back function
//this function will be called every 1 second
setInterval(() => {

    

    //creating an array for days and months
    const time = new Date();//creating a variable called time, using the DAte class
    //now we need to format this date, to get the different values
    const month = time.getMonth();// here we are getting the values from 0-11 we need to convert these later
    const date = time.getDate();// here we are getting the values from 0-6 we need to convert these later
    const day = time.getDay();
    const hour = time.getHours();//this hour give hour in 24 hour format
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour//converting 24 into 12 hrs
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    //setting up the Time and date
    //using string concatination
    //here, this means if the hourcs are less than 10 then 0 will be added along wiht hrs mins and AM/PM 
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    //updating the date
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    // we will use the navigator to get the geo location and based on that we will get the latitude and longnitude
    navigator.geolocation.getCurrentPosition((success) => {
        //getCurrentPosition() will have a successcallback, error callback
        //after getting the lat and long we will fetch the api
        //this whole api then returns a response using the . operator
         //now we have gotten a response from the api
        // so now we will use this data response to call the data below using the function
        //showWeatherData(data);this will show the humidity, speed, time etc
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    //the original sunrise and sunset values are given in UNIX units so we can't pass them directly into the div
    //in order to format this we need to use the moment cdn js script package
    //this script has been copied into index.html


    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
   

    <div class="weather-item">
        <div>Sunrise</div>
        <!--we multiply this with thousand to get the correct time for sunrise and sunset-->
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;



// we will loop through the daily array
// in the daily array-> the 0 position will be the current day's data
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){//current day has a different html and css design than all the other days
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <!--
                   **** day.dt means day's date
                    using ddd we set the format
                    for the icon we use the 10d icon from the openweather map
                    //we use this icon using weather[0].icon 
                -->
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}