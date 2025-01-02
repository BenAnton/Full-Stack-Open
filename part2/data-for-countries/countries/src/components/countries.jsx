/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
  const [weather, setWeather] = useState(null);

  const getWeather = (city) => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      if (country.capital) {
        getWeather(country.capital[0] || country.capital);
      }
    }
  }, [countries]);

  const handleButtonClick = (country) => {
    setSelectedCountry(country);
  };

  const renderCountryDetails = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>
          Languages:{" "}
          {country.languages
            ? Object.values(country.languages).map((language, index) => (
                <span key={index}>
                  {language}
                  {index < Object.values(country.languages).length - 1
                    ? ", "
                    : ""}
                </span>
              ))
            : "N/A"}
        </p>
        <img src={country.flags.png}></img>

        {weather && (
          <div>
            <h2>Weather is {weather.name}</h2>
            <p>Temperature: {weather.main.temp - 273.15} celcius</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  };

  if (countries.length === 0) {
    return <p>Please enter country</p>;
  }

  if (countries.length > 10) {
    return <p>Please be more specific</p>;
  }

  if (countries.length === 1) {
    return renderCountryDetails(countries[0]);
  }

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => handleButtonClick(country)}>Show</button>
          </li>
        ))}
      </ul>
      {selectedCountry && <div>{renderCountryDetails(selectedCountry)}</div>}
    </div>
  );
};

export default Countries;
