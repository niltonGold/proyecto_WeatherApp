import { useEffect, useState } from "react"
import ApiKey from "../apiKey";
import * as React from 'react';
import { ConstructionOutlined } from "@mui/icons-material";
import './style.css';

const apiKey  = ApiKey;

export default function CardActualInfo(props){
    


    const [ cityDatesByLatLong, upDateCityDatesByLatLong  ] = useState();

    const latitud = props.lat;
    const longitud = props.lon;




    const [ iconCode, upDateIconcode ] = useState('01d');


    const [ temperatura, upDateTemperatura ] = useState(0);

    const [ simboloCelcius, upDateSimboloCelcius ] = useState(false);

    const [ simboloFarenheit, upDateSimboloFarenheit ] = useState(false);

    const [ cieloDescripcion, upDateCieloDescripcion ] = useState('');

  



    // Constaste que recibira la fecha y hora de la ciudad en cuestion
    const [ fechaYhora, upDateFechaYhora ] = useState('');


    // // Constaste que recibira el dia actual
    // const [ day , upDateDay ] = useState('');


    // // Constante que recibira la hora actual
    // const [ hour, upDateHour ] = useState('');


    // // Constante que me ayudara a mostrar el weather description
    // const [ weatherDescription, upDateWeatherDescription ] = useState('');


  


   
    // Con esta funcion llamo a la api por latitud y longitud de una ciudad
    async function dataWeatherByLatLon(lat, lon){
        if ( (lat === '') || (lon === ''))
        {
            console.log('latitud y longitud vacios')
        }else{

            const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

            const date = await d.json();
            
            upDateCityDatesByLatLong(date);

            upDateIconcode(date.current?.weather[0].icon);

            upDateTemperatura(date.current?.temp); 

            upDateFechaYhora(date.current?.dt);
            
            upDateCieloDescripcion(date.current?.weather[0].description);

 

            

        }
    } 
   

        
        


        
    // Funcion que me ayudara a calcular el dia de la semana actual
    function diaDeLaSemana(dia){
        const date = new Date(dia*1000);
        let numberDay = date.getDay();  
        const arrayDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
        dia = arrayDays[numberDay];
        return dia;
    }


    // Funcion que me ayudara a calcular la hora y minutos actuales
    function horaActual(hora){
        
        const date = new Date(hora*1000);
        let numberHora = date.getHours();
        let numberMinutos = date.getMinutes();  
        // console.log('hora: '+typeof(numberHora));
        // console.log('minuto: '+typeof(numberMinutos));
        
        let formatoHora = '00';
        let formatoMinutos = '00';

        if ( numberHora<9 ){
            formatoHora = `${0}${numberHora}`;
        }else{
            formatoHora = `${numberHora}`
        }

        if(numberHora===24){
            formatoHora = `${0}${0}`;
        }
        

        if ( (numberMinutos<9) ){
            formatoMinutos = `${0}${numberMinutos}`;
        }else{
            formatoMinutos = `${numberMinutos}`
        }

        if(numberMinutos===24){
            formatoMinutos = `${0}${0}`;
        }



        hora = formatoHora+':'+formatoMinutos;


        return hora;
    }


  



    function kelvinAcelcius(temp){

        if ( temp === 0 ) {
            return 0;
        }else{
            const num = parseInt(temp)-273.15;
            return num.toFixed(0);
        }
    }

    function kelvinAFahrenheit(temp){
        const num = (parseInt(temp)-273.15)*(9/5)+32
        return num.toFixed(0);
    }


    useEffect( () => {
        dataWeatherByLatLon(props.lat, props.lon);

        if ( props.temperatureFormat === 'celcius' ){
            upDateSimboloCelcius(true);
            upDateSimboloFarenheit(false);
        }
        
        if ( props.temperatureFormat === 'farenheit' ){
            upDateSimboloCelcius(false);
            upDateSimboloFarenheit(true);
        }

    }, [props.lat, props.lon, props.temperatureFormat]);


    return(
        <div className='card_actual' >
            <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} />

            {/* <div>{props.temperature}</div> */}
            
            <div>
                <div>
                { props.temperatureFormat === 'celcius' ? kelvinAcelcius(temperatura) : kelvinAFahrenheit(temperatura) }
                </div>
                <div className={ simboloCelcius ? '' :'ocultar-celcius' }>
                    ºC
                </div>
                <div className={ simboloFarenheit ? '' :'ocultar-farenheit' }>
                    ºF
                </div>
            </div>

            <div>{diaDeLaSemana(fechaYhora)},</div>
            <div>{horaActual(fechaYhora)}</div>


            <img className="icono_cloud" src={`http://openweathermap.org/img/wn/03d@2x.png`} />

            <div>{cieloDescripcion}</div>

            


            

        {/*  

            <div>{weatherDescription}</div> */}

            {/* <div>{longitud}</div>
            <div>{latitud}</div> */}
            
            {/* <div>{console.log(cityDatesByLatLong)}</div> */}
          
            

            
        </div>
    )
}