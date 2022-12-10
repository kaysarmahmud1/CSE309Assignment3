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

setInterval(()=>{//this setInterval function is a call-back function
    //this function will be called every 1 second

    //creating an array for days and months



    const time = new Date();//creating a variable called time, using the DAte class
    //now we need to format this date, to get the different values
    const month = time.getMonth();// here we are getting the values from 0-11 we need to convert these later
    const date = time.getDate();// here we are getting the values from 0-6 we need to convert these later
    const day = time.getDay();
    const hour = time.getHours();//this hour give hour in 24 hour format
    const hoursIn12HrFormat = hour>=13? hour%12: hour;
    const minutes = time.getMinutes();
    const ampm = hour>= 12?'PM':'AM';


    //setting up the Time and date
    //using string concatination
    timeEl.innerHTML = hoursIn12HrFormat + ':' +  minutes + ':' + `<span id="am-pm">${ampm}</span>`
 


},1000);

