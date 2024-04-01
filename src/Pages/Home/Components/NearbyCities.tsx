import { NearbyProp } from "@/Datatypes/api";

const NearbyCities = (props : {nearby : Array<NearbyProp> | undefined}) => {
    return(
        <div className="nearby p-4 flex flex-col justify-around overflow-visible">
            <div className="hidden lg:flex justify-between ">
                <span className="text-white text-[1.5rem]"><h2>Other Cities</h2></span>
                <span className="bg-[#333] px-3 py-2 rounded-3xl text-white text-[0.675rem]"><h2>Show All</h2></span>
            </div>
            <div className=" lg:hidden mx-auto">
                <span className="text-white text-[2rem]"><h1>Other Cities</h1></span>
            </div>
            <div className="flex flex-row justify-start overflow-x-scroll gap-4 lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-6">
                {props.nearby?.map((city) =>  {
                    if (!city || !city.weather) return null; 
                    return(
                        <div className="flex justify-start nearby-card h-full items-center p-3 lg:w-full min-w-fit" key={city.name}>
                            <div className="flex flex-col">
                                <span className="text-[#919192] text-[1.2rem] 2xl:text-[1.75rem]"><h2>{city.name},{city.country}</h2></span>
                                <span className="text-[#919192] text-sm"><h2>{city.weather.condition}</h2></span>
                            </div>
                            <div className="flex flex-col">
                                <img src={city.weather.logo} alt="weather logo" className="w-8 h-8"/>
                                <span className="text-white text-2xl font-semibold"><h2>{city.weather.temperature}°</h2></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default NearbyCities;
