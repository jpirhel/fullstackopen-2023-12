import {useEffect, useState} from 'react'

import {getAll} from "../services/countries.js";

import CountryInfo from "./components/CountryInfo.jsx";
import CountryListItem from "./components/CountryListItem.jsx";
import NumMatchesInfo from "./components/NumMatchesInfo.jsx";

import "./App.css";

function App() {
    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getAll().then((result) => {
            const countries = result.data;
            setCountries(countries);
        });
    }, []);

    const handleOnChangeFilter = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
    };

    const filteredCountries = countries.filter((country) => {
        if (filter === '') {
            // all countries match an empty filter
            return true;
        }

        let f = filter.toLowerCase();

        let match = false;

        try {
            if (country.name.common.toLowerCase().indexOf(f) !== -1) {
                match = true;
            }

            if (country.name.official.toLowerCase().indexOf(f) !== -1) {
                match = true;
            }
        } catch (e) {
            // nothing
        }

        return match;
    });

    const hasOnlyOneMatch = filteredCountries.length === 1;
    const hasListMatches = (!hasOnlyOneMatch) && filteredCountries.length <= 10;

    return (
        <div>
            <div className="input">
                <label htmlFor="filterInput">find countries</label>
                <input id="filterInput" onChange={handleOnChangeFilter} value={filter}/>
            </div>
            <div className="result">
                {!hasListMatches
                    ? <NumMatchesInfo countries={filteredCountries}/>
                    : filteredCountries.map((country) =>
                        <CountryListItem
                            key={country.name.official}
                            country={country}/>)}
                {filteredCountries.length === 1 && <CountryInfo key="list-country-info" country={filteredCountries[0]}/>}
            </div>
        </div>
    );
}

export default App
