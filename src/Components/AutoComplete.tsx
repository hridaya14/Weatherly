import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

const popularCities = [
  { address: { name: "New York", country_code: "US" } },
  { address: { name: "London", country_code: "GB" } },
  { address: { name: "Paris", country_code: "FR" } },
  { address: { name: "Tokyo", country_code: "JP" } },
  { address: { name: "Sydney", country_code: "AU" } },
  { address: { name: "Berlin", country_code: "DE" } },
  { address: { name: "Rome", country_code: "IT" } },
  { address: { name: "Barcelona", country_code: "ES" } },
  { address: { name: "Los Angeles", country_code: "US" } },
  { address: { name: "Moscow", country_code: "RU" } },
  { address: { name: "Dubai", country_code: "AE" } },
  { address: { name: "Shanghai", country_code: "CN" } },
  { address: { name: "Mexico City", country_code: "MX" } },
  { address: { name: "São Paulo", country_code: "BR" } },
  { address: { name: "Mumbai", country_code: "IN" } },
];

const Complete = async (value: string) => {
  try {
    const url = `https://eu1.locationiq.com/v1/autocomplete?q=${value}&tag=place%3Acity&key=${
      import.meta.env.VITE_LOCATION_IQ_APIKEY
    }`;
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching autocomplete data:", err);
    return [];
  }
};

const getCoordinates = async (city: string) => {
  try {
    const url = `https://us1.locationiq.com/v1/search?q=${city}&format=json&limit=1&key=${
      import.meta.env.VITE_LOCATION_IQ_APIKEY
    }`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return null;
  }
};

const AutoComplete = ({
  text,
  handler,
  setCoordinates,
  setSearchValue,
  setIsActive,
  dropdownRef,
}: any) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedFetch = debounce(async (query: string) => {
    if (!query) return setSuggestions(popularCities); // Show popular cities when no query

    setLoading(true);
    const data = await Complete(query);
    setSuggestions(data);
    setLoading(false);
  }, 500);

  useEffect(() => {
    debouncedFetch(text);
    return () => debouncedFetch.cancel();
  }, [text]);

  const handleSelect = async (cityName: string, countryCode: string) => {
    const location = `${cityName},${countryCode.toUpperCase()}`;
    handler(location);
    setSearchValue(""); // Clear the search input
    setIsActive(false); // Close the dropdown after selection

    const coordinates = await getCoordinates(cityName);
    const latitude = coordinates[0]?.lat;
    const longitude = coordinates[0]?.lon;
    if (coordinates) {
      setCoordinates({
        latitude,
        longitude,
      });
    }
  };


  return (
    <div
      ref={dropdownRef} // Attach the dropdownRef to the dropdown container
      className="w-full backdrop-blur-sm p-2 mt-1 rounded-lg absolute top-10 z-50"
    >
      {loading && <div className="text-white text-center">Loading...</div>}
      {suggestions.length > 0 && !loading && (
        <ul className="w-full">
          {suggestions.map((suggestion: any) => (
            <li key={suggestion.id}>
              <button
                className="text-white block w-full text-left p-2 hover:bg-gray-700"
                onClick={() =>
                  handleSelect(
                    suggestion?.address?.name,
                    suggestion?.address?.country_code
                  )
                }
              >
                {suggestion?.address?.name},{" "}
                {suggestion?.address?.country_code.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
      {text && suggestions.length === 0 && (
        <div className="text-white text-center p-2">No results found.</div>
      )}

    </div>
  );
};

export default AutoComplete;
