
export interface WeatherObject{
    temperature:number,
    location: string,
    country: string,
    wind_speed: string,
    wind_degree: string,
    wind_dir: string,
    humidity: number,
    precipitation: number,
    pressure: string,
    condition: string,
    logo: string,
    feels_like: number,
}

export interface forecast{
    "queryCost": number,
    "latitude": number,
    "longitude": number,
    "resolvedAddress": string,
    "address": string,
    "timezone": string,
    "tzoffset": number,
    "description": string,
    "sunrise": string,
    days: Array<day>
}

export interface day{
    datetime: string , 
    sunrise: string,
    sunset : string,
    icon: string,
    temp : string,
    hours: Array<Object>
}

export type forecastProp = {
    forecast : forecast | undefined
    nearby : NearbyProp[] | undefined
}

export type NearbyProp = {
    name : string,
    country : string,
    weather : WeatherObject
}