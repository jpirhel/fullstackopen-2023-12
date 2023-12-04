import {useEffect, useState} from "react";

import axios from 'axios';

const Weather = ({country}) => {
    const [data, setData] = useState(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&apiKey=${apiKey}`;

        axios.get(apiUrl).then((result) => {
            setData(result.data);
        });
    }, []);

    if (! data) {
        return null;
    }

    const kelvinZero = -273.16;

    // use first weather object
    const weather = data.weather[0];

    const icon = weather.icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // convert API returned Kelvin temperature to Celsius
    const temperatureNotRounded = data.main.temp + kelvinZero;

    const temperature = temperatureNotRounded.toFixed(2);

    const windSpeed = data.wind.speed;

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            temperature {temperature} Celsius<br/>
            <img src={weatherIconUrl} /><br/>
            wind {windSpeed} m/s<br/>
        </div>
    );
}

export default Weather;
