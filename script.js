

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const locationName = document.querySelector('.location-name');
const currentDateValue = document.querySelector('.date');
const currentDay = document.querySelector('.day');
const locationTime = document.querySelector('.location-time');
const WeatherImage = document.querySelector('#weather-icon');
const WeatherDescription = document.querySelector('#weather-description');
const currentTemperature = document.querySelector('.temperature');
const feelsTemperature =document.querySelector('.temperature-feels')

const daysOfWeek = ['Sunday','Monday','Tuesday','wednesday','Thursday','Friday','Saturday'] 

const display = (e) => {
    e.preventDefault();
    const searchValue = searchInput.value.trim().replace(/\s+/g, ' ');
    if (searchValue) {
        // errorMessage.textContent = ''
        weatherData(searchValue);
        searchInput.value = ''
    } else {
        console.log('search is empty')
        // errorMessage.textContent = 'Please enter a city name'
    }
}

searchForm.addEventListener('submit', display);

  async function weatherData(locationName) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b1f65c73a4144e70ad460955241301&q=${locationName}&days=3`);
      const weatherData = await response.json();
      // console.log(weatherData.location);
      const{location,current,forecast} = weatherData
      const[currentDate,localTime] = location.localtime.split(" ")
      
      if(location && current && forecast){
        // console.log(location)
        console.log(current)

        // console.log(forecast)
        console.log(currentDate);
        console.log(localTime);
        renderLocationData(location,currentDate,localTime);
        renderCurrentWeatherData(current);
      }
    
    }
    catch (error) {
    //   errorMessage.textContent = "can't locate the place you entered"
      console.error('Error fetching data:', error);
    }
}

const renderLocationData= (location,currentDate,localTime) =>{
  locationName.textContent =`${location.name},${location.region}`
  localDayAndDate(currentDate,localTime)
}

const localDayAndDate = (currentDate,localTime) =>{
  
  locationTime.textContent = localTime;

  const dayDate = new Date(currentDate);
  const dayIndex = dayDate.getDay();
  const dayName = daysOfWeek[dayIndex];

  currentDateValue.textContent = dayDate.toLocaleDateString();
  currentDay.textContent = dayName;
 
}

const renderCurrentWeatherData = (current) =>{
  const weatherImageUrl = current.condition.icon
  const weatherConditionText = current.condition.text
  WeatherImage.src = weatherImageUrl;
  
  const tempInCelsius  = current.temp_c
  const tempInFahrenheit  =current.temp_f
  currentTemperature.textContent  =`${tempInCelsius}°C`

  const feelsLIkeTempInCelsius = current.feelslike_c
  const feelsLIkeTempInFahrenheit = current.feelslike_f
  feelsTemperature.textContent = `Feels LIke: ${feelsLIkeTempInCelsius}`;
}
weatherData("Manchester");