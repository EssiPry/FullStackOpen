import {useState, useEffect} from 'react'
import weatherService from '../services/weather'

const Weather = ({country}) => {

const [weather, setWeather] = useState({})
const [state, setState] = useState('')

useEffect(() => {
  weatherService
    .getWeather(country)
    .then(weatherData => {
      setWeather(weatherData)
      setState('success')
    })
},[])

if (state === 'success') {
    return <>
        <h3>Weather in {country.capital}</h3>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}/>
        <p>wind {weather.wind.speed} m/s</p>
    </> }
return <>
    <p>Weather information not available.</p>
    </>
}

export default Weather