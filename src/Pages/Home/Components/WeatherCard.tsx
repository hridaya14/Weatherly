import { WeatherObject, forecast } from '@/Datatypes/api';
import { useState, useEffect } from 'react';

type WeatherProp = {
    location: string;
    weather : WeatherObject | undefined ;
    forecast : forecast | undefined;
}

const WeatherCard = (props: WeatherProp) => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="weather-card h-full min-h-[45rem] w-full max-w-96 lg:w-[28rem] lg:mx-6 px-8 py-8 space-y-4">
            <div className="flex justify-between my-6">
                <div className="bg-white rounded-3xl px-3 p-1 ">
                    <h3 className="text-black text-base">{props.location}</h3>
                </div>
                <span className="text-white text-base px-3 p-1">{currentTime}</span>
            </div>
            <div className='flex justify-center gap-8'>
                <span><img src = {props.weather?.logo}></img></span>
                <span className=' text-lg text-[#919192] my-auto'><h3>{props.weather?.condition}</h3></span>
            </div>
            <div className=' flex justify-center '>
                <h1 className='text-white text-[4rem] lg:text-[10rem]'>{props.weather?.temperature}</h1>
                <h3 className='text-white text-2xl lg:text-4xl'>°C</h3>
            </div>
            <div className='flex justify-around '>
                <span className='space-y-4 text-center'>
                    <h3 className='text-[#919192] text-base'>Pressure</h3>
                    <h2 className='text-white font-semibold text-lg'>{props.weather?.pressure}</h2>
                </span>
                <span className='space-y-4 text-center'>
                    <h3 className='text-[#919192] text-base'>Humidity</h3>
                    <h2 className='text-white font-semibold text-lg'>{props.weather?.humidity}%</h2>
                </span>
                <span className='space-y-4 text-center'>
                    <h3 className='text-[#919192] text-base'>Wind Speed</h3>
                    <h2 className='text-white font-semibold text-lg'>{props.weather?.wind_speed}kmph</h2>
                </span>
            </div>
            <div className='bg-[#1B1C1E] rounded-2xl p-4'>
                <img src = "sunset.png"></img>
                <h3 className='text-[#87878B] text-sm'>Sunrise</h3>
                <h1 className='text-white text-base'>{props.forecast?.days[0].sunrise}</h1>
            </div>
            <div className='bg-[#1B1C1E] rounded-2xl p-4'>
                <img src = "sunset.png"></img>
                <h3 className='text-[#87878B] text-sm'>Sunset</h3>
                <h1 className='text-white text-base'>{props.forecast?.days[0].sunset}</h1>
            </div>
        </div>
    );
}

export default WeatherCard;
