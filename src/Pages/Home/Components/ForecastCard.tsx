import { day } from "@/Datatypes/api";
interface props {
    day : day

}
const ForecastCard = (props : props ) => {
    const date = new Date(props.day.datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    return(
        <div className="card p-4 h-60 min-w-32 flex flex-col items-center justify-around">
            <span className="text-white text-2xl"><h2>{day}/{month}</h2></span>
            <span className="text-[#919192] text-xl"><h3>{weekday}</h3></span>
            <img src = {`/icons/${props.day.icon}.png`} alt = "weather icon"/>
            <span className="text-[white] text-3xl"><h1>{props.day.temp}</h1></span>
        </div>
    )
}
export default ForecastCard;