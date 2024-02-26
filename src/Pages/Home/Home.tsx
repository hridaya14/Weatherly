import { useRecoilValue } from "recoil";
import { WeatherCard } from "./Components/index";
import { locationState } from "@/atoms/Location";
import { useEffect } from "react";
import { WeatherObject } from "../../Datatypes/api";
import axios from "axios";

const apiCall = async (location : string) => {
    try{
        const response = await axios.get(`https://weather-forecast-api-production.up.railway.app/current?query=${location}`);
        const data: WeatherObject = response.data;
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}
const Home = () => {
    const location = useRecoilValue(locationState);
    useEffect(() => {
        apiCall(location);
    },[])
    
    return(
        
        <div className=" lg:h-full lg:overflow-y-scroll flex flex-col items-center">
            <WeatherCard location = {location} /> 
        </div>
    )
}

export default Home;