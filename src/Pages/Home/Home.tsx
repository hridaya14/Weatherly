import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WeatherCard, HomeWidget } from "./Components/index";
import { Loading } from "../../Components/Loading";
import { locationState , locationCoordinates } from "@/atoms/Location";
import { NearbyProp, WeatherObject, forecast } from "../../Datatypes/api";
import Cookies from "js-cookie";
import axios from "axios";
import { user } from "@/atoms";

const formatCoordinates = (latitude : number, longitude : number) => {
    const latDirection = latitude >= 0 ? '+' : '-';
    const lonDirection = longitude >= 0 ? '+' : '-';
    const lat = Math.abs(latitude).toFixed(4);
    const lon = Math.abs(longitude).toFixed(4);

    return `${latDirection}${lat}${lonDirection}${lon}`;
}

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

const getNearby = async (coordinates : string) => {
    try {
        const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${coordinates}/nearbyPlaces?limit=5&offset=0&types=CITY&minPopulation=1000000&radius=100`);
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
    const [weather, setWeather] = useState<WeatherObject>();
    const [forecast, setForecast] = useState<forecast>();
    const [nearby, setNearby] = useState<Array<NearbyProp>>();
    const [loading, setLoading] = useState<boolean>(true);
    const setUser = useSetRecoilState(user);
    const [locationCoordinate, setLocationCoordinate] = useRecoilState(locationCoordinates);
    const [locationPermission, setLocationPermission] = useState<boolean>(false);

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
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            if (permissionStatus.state === 'granted') {
                setLocationPermission(true);
            } else {
                setLocationPermission(false);
            }
        });
    }, []);

    useEffect(() => {
        if (!locationPermission) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocationCoordinate(formatCoordinates(latitude, longitude));
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, [locationPermission, setLocationCoordinate]);

    const [location,setLocation] = useRecoilState(locationState);

    useEffect(() => {
        if (!location) return;

        Promise.all([
            getCurrentWeather(location),
            getForecast(location),
            getNearby(locationCoordinate)
        ])
        .then(([weatherData, forecastData, nearbyData]) => {
            setWeather(weatherData);
            setForecast(forecastData);
            setNearby(nearbyData);
            if(location === 'Delhi,IN'){
                setLocation(nearbyData[0].name + ',' + nearbyData[0].country)
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [location]);

    if (loading || !locationPermission) {
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
