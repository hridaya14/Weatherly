import { ForecastWidget , NearbyCities , Subscribe } from "./index";
import { forecastProp } from "@/Datatypes/api";

const HomeWidget = (props : forecastProp) => {
    return(
        <div className=" home h-full w-full overflow-visible">
            <ForecastWidget forecast = {props.forecast} />
            <NearbyCities nearby={props.nearby}/>
            <Subscribe/>
        </div>
    )
}

export default HomeWidget;