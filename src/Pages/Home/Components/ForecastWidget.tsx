import { forecast} from "@/Datatypes/api";
import { ForecastCard } from ".";
const ForecastWidget = (props:{forecast : forecast | undefined}) => {
    const days = props.forecast?.days;
    return(
        <div className="forecast p-4 flex flex-col justify-around">
            <div className="hidden lg:flex lg:justify-between">
                <span className="text-black bg-white p-2 rounded-3xl"><h3>Weather Advisor</h3></span>
                <span className="text-white"><a href="#">More Details</a></span>
            </div>
            <div className=" lg:hidden mx-auto">
                <span className="text-white text-[2rem]"><h1>Forecast</h1></span>
            </div>
            <div className="flex flex-row gap-6 justify-start overflow-x-scroll">
                {days?.map((day,index) => {
                    return(
                        <ForecastCard day = {day}/>
                    )
                })}
            d</div>
            
        </div>
    )
}
export default ForecastWidget;