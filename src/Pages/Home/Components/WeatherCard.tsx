import React, { useState, useEffect } from 'react';

type WeatherProp = {
    location: string;
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
        <div className="weather-card h-full min-w-96 lg:mx-6 px-8">
            <div className="flex justify-between my-6">
                <div className="bg-white rounded-3xl px-3 p-1 ">
                    <h3 className="text-black text-base">{props.location}</h3>
                </div>
                <span className="text-white text-base px-3 p-1">{currentTime}</span>
            </div>
        </div>
    );
}

export default WeatherCard;
