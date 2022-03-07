import { useState } from "react"
import ApiKey from "../apiKey";


export default function ActualInfo(props){

    const [ ciudadFromSearch, upDateCiudadFromSearch ] = useState(props.cityFromSearch);




    return(
        <div>
            <div>imagen del clima</div>
            <div>{ciudadFromSearch}</div>
            <div>{ApiKey}</div>
        </div>
    )
}