import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`

const getWeather  = (country) => {
    const request = axios.get(`${baseUrl}${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {getWeather}
