import Country from './Country'

const Countries = ({countries, handleShowCountry}) => {
    if(countries.length > 10){
        return <>Too many matches, specify another filter </>}
    if(countries.length === 1){
        return <Country country={countries[0]}/>
    }
    return <>{countries.map(country => <p key={country.name.common}> {country.name.common} <button onClick={() => handleShowCountry(country)}>show</button></p>)}</>
}

export default Countries