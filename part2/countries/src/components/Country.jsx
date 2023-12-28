const Country = ({country}) => {
    console.log(country)
    return <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
        {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
    </>
}

export default Country