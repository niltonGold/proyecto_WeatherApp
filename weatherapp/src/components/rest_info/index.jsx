import './style.css';
import { useEffect, useState } from "react";
import ApiKey from "../apiKey";
import OneDayCardWeek from '../oneDayCardWeek';

const apiKey  = ApiKey;

export default function RestInfo(props){


    const [ arrayWeekDays, upDateArrayWeekDays ] = useState([]);

   // Con esta funcion llamo a la api por latitud y longitud de una ciudad
   async function dataWeatherByLatLon(lat, lon){

    
       
    if ( (lat === '') || (lon === ''))
    {
        console.log('latitud y longitud vacios')
    }else{

        const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        const date = await d.json();
        
        console.log(date?.daily.slice(1,date?.daily.lenght));

        upDateArrayWeekDays(date?.daily.slice(1,date?.daily.lenght));
        
    }
} 



    useEffect( () => {
        dataWeatherByLatLon(props.lat, props.lon);

    }, [props.lat, props.lon, props.temperatureFormat]);




    return(
        <div className="rest_info">


            <div className='container_cardsWeek'>
                
                { arrayWeekDays.map( (element, index) =>

                    <OneDayCardWeek  key={index} fecha={element.dt} iconCode={element.weather[0]?.icon} temperatureMax={element.temp?.max} temperatureMin={element.temp?.min} temperatureFormat={props.temperatureFormat} ></OneDayCardWeek>

                )}
                
            </div>

            <div>Today's Highlights


            </div>
            
        </div>
    )
}