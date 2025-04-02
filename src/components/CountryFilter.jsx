import { useState } from "react";

const CountryFilter = ({ setCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  // Debugging: Check if component is rendering
  console.log("CountryFilter component is rendering");

  const countries = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "in", name: "India" },
    { code: "de", name: "Germany" }
  ];

  const handleCountrySelect = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setCountry(countryCode);
  };

  return (
    <div>
      <select onChange={handleCountrySelect} value={selectedCountry}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryFilter;

