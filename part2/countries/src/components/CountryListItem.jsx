import {useState} from "react";

import CountryInfo from "./CountryInfo.jsx";

const CountryListItem = ({country}) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleOnClick = () => {
        setShowInfo(! showInfo);
    };

    const countryInfoKey = `country-info-${country.name.common}`;

    return (
        <div>
            {country.name.common} <button onClick={handleOnClick}>show</button>
            {showInfo && <CountryInfo key={countryInfoKey} country={country}/>}
        </div>
    );
}

export default CountryListItem;
