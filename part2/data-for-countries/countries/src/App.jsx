import { useState, useEffect } from "react";
import countryAPI from "./services/services";
import Countries from "./components/countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    console.log("Search changed to:", search);
    if (search) {
      countryAPI
        .getAll()
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => {
          console.error("Error Fetching countries", error);
        });
    }
  }, [search]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>find countries </label>
        <input type="text" value={search} onChange={handleInputChange}></input>
        <Countries
          countries={filteredCountries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </form>
    </>
  );
}

export default App;
