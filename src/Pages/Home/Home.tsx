import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WeatherCard, HomeWidget } from "./Components/index";
import { Loading } from "../../Components/Loading";
import {
  locationState,
  locationCoordinates,
  CoordinateType,
} from "@/atoms/Location";
import { NearbyProp, WeatherObject, forecast } from "../../Datatypes/api";
import Cookies from "js-cookie";
import axios from "axios";
import { user } from "@/atoms";

const getCurrentWeather = async (location: string) => {
  try {
    const response = await axios.get(
      `https://weather-forecast-api-lo1h.onrender.com/current?query=${location}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getForecast = async (location: string) => {
  try {
    const response = await axios.get(
      `https://weather-forecast-api-lo1h.onrender.com/forecast?query=${location}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getLocation = async (coordinates: CoordinateType) => {
  try {
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`
    );
    return `${data.city},${data.countryCode}`;
  } catch (error) {
    console.error("Error fetching location name:", error);
    return null;
  }
};

const getNearby = async (coordinates: CoordinateType, location: string) => {
  try {
    const { latitude, longitude } = coordinates;

    // Create the locationId in the format +lat+long or -lat-long
    const locationId = `${parseFloat(latitude) > 0 ? "" : ""}${parseFloat(
      latitude
    )}${parseFloat(longitude) > 0 ? "+" : ""}${parseFloat(longitude)}`;

    // Check if nearby data is already cached
    const cachedData = localStorage.getItem(`nearby-${locationId}`);
    if (cachedData) {
      console.log("Using cached nearby cities data.");
      return JSON.parse(cachedData);
    }

    // If not cached, make API call
    const response = await axios.get(
      `http://geodb-free-service.wirefreethought.com/v1/geo/locations/${locationId}/nearbyPlaces`,
      {
        params: {
          limit: 10, // Number of cities to fetch
          offset: 0,
          types: "CITY",
          minPopulation: 70000,
          radius: 100, // Radius in km
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Get the first 10 cities from the response
    const nearbyCities = response.data.data.slice(0, 10);

    // Filter out cities that have the same name as the current location or contain the location's name
    const filteredCities = nearbyCities.filter(
      (city: any) =>
        !city?.name.toLowerCase().includes(location.toLowerCase()) &&
        city?.name.toLowerCase() !== location.toLowerCase()
    );

    // Limit the result to 4 cities
    const limitedCities = filteredCities.slice(0, 4);

    // Create an array of objects with { name, country, weather }
    const nearbyCitiesWithWeather = await Promise.all(
      limitedCities.map(async (city: any) => {
        const cityWeather = await getCurrentWeather(city.name); // Get weather for the city
        return {
          name: city.name,
          country: city.countryCode,
          weather: cityWeather, // Add weather info here
        };
      })
    );

    // Cache the result for future use
    localStorage.setItem(
      `nearby-${locationId}`,
      JSON.stringify(nearbyCitiesWithWeather)
    );

    return nearbyCitiesWithWeather;
  } catch (error) {
    console.error("Error fetching nearby cities:", error);
    return [];
  }
};

const initializeUser = async () => {
  const response = await axios.get(
    "https://weather-forecast-api-lo1h.onrender.com/user/getUsername",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data;
};

const Home = () => {
  const [weather, setWeather] = useState<WeatherObject>();
  const [forecast, setForecast] = useState<forecast>();
  const [nearby, setNearby] = useState<Array<NearbyProp>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isWidgetsReady, setIsWidgetsReady] = useState<boolean>(false);
  const setUser = useSetRecoilState(user);
  const [locationCoordinate, setLocationCoordinate] =
    useRecoilState(locationCoordinates);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [location, setLocation] = useRecoilState(locationState);

  useEffect(() => {
    setLoading(true);
    initializeUser()
      .then((username) => {
        setUser(username);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error initializing user:", error);
        setLoading(false);
      });
  }, [setUser]);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          setLocationPermission(true);
        } else if (permissionStatus.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            () => {
              setLocationPermission(true);
            },
            () => {
              setLocationPermission(false);
            }
          );
        } else {
          setLocationPermission(false);
        }
      });
  }, []);

  useEffect(() => {
    if (!locationPermission) {
      setLocation("Delhi,IN"); // Default location if permission is denied
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const coordinates = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };

        setLocationCoordinate(coordinates);

        const resolvedLocation = await getLocation(coordinates);
        if (resolvedLocation) {
          setLocation(resolvedLocation);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
        setLocation("Delhi,IN"); // Fallback to default if geolocation fails
      }
    );
  }, [locationPermission]);

  useEffect(() => {
    if (!location || !locationCoordinate) return;

    setLoading(true);
    setIsWidgetsReady(false); // Reset the widgets readiness state

    Promise.all([
      getCurrentWeather(location),
      getForecast(location),
      getNearby(locationCoordinate, location),
    ])
      .then(([weatherData, forecastData, nearbyData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
        setNearby(nearbyData);
        setIsWidgetsReady(true); // Widgets are ready after data fetching
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsWidgetsReady(true); // Allow widgets to render even if data fetching fails
        setLoading(false);
      });
  }, [location, locationCoordinate]);

  if (loading || !isWidgetsReady) {
    return <Loading />;
  }

  if (!locationPermission) {
    return (
      <div className="flex justify-center items-center h-screen">
        Allow location services in the above prompt
      </div>
    );
  }

  return (
    <div className="h-full lg:overflow-y-scroll flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-start lg:w-full">
      <WeatherCard location={location} weather={weather} forecast={forecast} />
      <HomeWidget forecast={forecast} nearby={nearby} />
    </div>
  );
};

export default Home;
