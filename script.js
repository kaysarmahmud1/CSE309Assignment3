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

setInterval(()=>{//this setInterval function is a call-back function
    //this function will be called every 1 second

    const time = new Date();//creating a variable called time, using the DAte class
    //now we need to format this date, to get the different values
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();//this hour give hour in 24 hour format
    const minutes = time.getMinutes();



},1000);

