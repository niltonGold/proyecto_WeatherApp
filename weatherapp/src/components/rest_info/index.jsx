import './style.css';
import { useEffect, useState } from "react";
import ApiKey from "../apiKey";

const apiKey  = ApiKey;

export default function RestInfo(props){

   // Con esta funcion llamo a la api por latitud y longitud de una ciudad
   async function dataWeatherByLatLon(lat, lon){
    if ( (lat === '') || (lon === ''))
    {
        console.log('latitud y longitud vacios')
    }else{

        const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        const date = await d.json();
        
        console.log(date?.daily);
        
    }
} 



    useEffect( () => {
        dataWeatherByLatLon(props.lat, props.lon);

    }, [props.lat, props.lon, props.temperatureFormat]);




    return(
        <div className="rest_info">
            rest info

            <div>week

            </div>

            <div>Today's Highlights


            </div>
            
        </div>
    )
}