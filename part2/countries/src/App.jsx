import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  },[])

  const countriesToShow = countryFilter
    ? countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    : countries

  const handleFilter = (event) => {
    //console.log(event.target.value)
    setCountryFilter(event.target.value)
  }

return  (
  <div>
    <Filter handleFilter={handleFilter}/>

    <Countries countries={countriesToShow}/>
  </div>
)

}

export default App
