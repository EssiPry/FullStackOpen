import axios from 'axios'
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/`

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getOne = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)


}

export default {getAll, getOne}