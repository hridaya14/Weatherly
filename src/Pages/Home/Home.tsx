import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { WeatherCard, HomeWidget } from "./Components/index";
import { Loading } from "../../Components/Loading";
import { locationState } from "@/atoms/Location";
import { NearbyProp, WeatherObject, forecast } from "../../Datatypes/api";
import Cookies from "js-cookie";
import axios from "axios";
import { user } from "@/atoms";

const getCurrentWeather = async (location: string) => {
    try {
        const response = await axios.get(`https://weather-forecast-api-production.up.railway.app/current?query=${location}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const getForecast = async (location: string) => {
    try {
        const response = await axios.get(`https://weather-forecast-api-production.up.railway.app/forecast?query=${location}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const getNearby = async (location: string) => {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${location.split(',')[1]}/regions?sort=isoCode`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd2b68aeffbmshb1a62ff83bd6d8dp1597f1jsne0f0fc531a15',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.data && data.data.length >= 4) {
            const firstFourCities = data.data.slice(0, 4);

            const locations = await Promise.all(firstFourCities.map(async (city: any) => {
                const weatherData = await getCurrentWeather(city.name);
                return {
                    name: city.name,
                    country: city.countryCode,
                    weather: weatherData
                };
            }));

            return locations;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching nearby cities:', error);
        return [];
    }
}

const initializeUser = async () => {
    const response = await axios.get('https://weather-forecast-api-production.up.railway.app/user/getUsername', {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return response.data;
}

const Home = () => {
    const location = useRecoilValue(locationState);
    const [weather, setWeather] = useState<WeatherObject>();
    const [forecast, setForecast] = useState<forecast>();
    const [nearby, setNearby] = useState<Array<NearbyProp>>();
    const [loading, setLoading] = useState<boolean>(true);
    const setUser = useSetRecoilState(user);

    useEffect(() => {
        setLoading(true);
        initializeUser()
            .then((username) => {
                setUser(username);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error initializing user:', error);
                setLoading(false);
            });
    }, [setUser]);

    useEffect(() => {
        if (!location) return;

        Promise.all([
            getCurrentWeather(location),
            getForecast(location),
            getNearby(location)
        ])
        .then(([weatherData, forecastData, nearbyData]) => {
            setWeather(weatherData);
            setForecast(forecastData);
            setNearby(nearbyData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [location]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="h-full lg:overflow-y-scroll flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-start lg:w-full">
            <WeatherCard location={location} weather={weather} forecast={forecast} />
            <HomeWidget forecast={forecast} nearby={nearby} />
        </div>
    );
}

export default Home;
