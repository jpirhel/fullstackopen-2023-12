import Weather from './Weather.jsx';

const CountryInfo = ({country}) => {
    console.log("CountryInfo, country:", country);

    const languages = Object.values(country.languages);

    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital} <br/>
            area {country.area} <br/>
            <h3>languages:</h3>
            <ul>
                {languages.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width={150}/>
            <Weather key={`weather-${country.name.common}`} country={country}/>
        </div>
    );
}

export default CountryInfo;
