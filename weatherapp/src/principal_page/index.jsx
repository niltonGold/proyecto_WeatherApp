import { useEffect, useState } from 'react';
import ActualInfo from '../components/cardActual_info';
import RestInfo from '../components/rest_info';
import './style.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActualInfo from '../components/cardActual_info';
import ApiKey from "../components/apiKey";


import * as React from 'react';
import Stack from '@mui/material/Stack';

import Fingerprint from '@mui/icons-material/Fingerprint';




const apiKey  = ApiKey;

export default function PrincipalPage(){


    const [ cityDates, upDateCityDates ] = useState('');

    const [ longitud, upDateLongitud ] = useState('');
 
    const [ latitud, upDateLatitud ] = useState('');

    // const [ temperatura, upDateTemperatura] = useState('');

    // Formulario que me extraerá la ciudad que escriba en el buscador
    const handleForm = (e) => {
        e.preventDefault();
        // console.log('principal page: '+e.target.inputText.value);
        dataWeatherByCity(e.target.inputText.value, apiKey);



        e.target.inputText.value = '';
    }


        // Con esta funcion llamo a la api por el nombre de una ciudad
        async function dataWeatherByCity(ciudad, apiKey){
        const d = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&include=main&appid=${apiKey}`);
        const data = await d.json();
        console.log(data);
    
        // dataWeatherByLatLon(data.coord?.lat,data.coord?.lon);
        upDateLongitud(data.coord?.lon);
        upDateLatitud(data.coord?.lat);
        // upDateTemperatura(data.main?.temp);
        // console.log('principal page: '+data.main.temp);
    }


    // // Con esta funcion llamo a la api por latitud y longitud de una ciudad
    // async function dataWeatherByLatLon(lat, lon){
    //     const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    //     const date = await d.json();
    //     upDateCityDates(date);
    //     // console.log(date);

    // } 


    const [ toggleState, upDateToggleState ] = useState('celcius');

    function toggleTab(formatoTemperatura){
        upDateToggleState(formatoTemperatura);
        // console.log(toggleState);
    }

  
    useEffect( () => {
        toggleTab(toggleState);
        

    }, [toggleState]);


    return(

        <div className="card_container">
            
            <div>
                
                    <Paper onSubmit={handleForm} component="form"  sx={{  height:'25px' , p: '1px 2px', display: 'flex', alignItems: 'center', width:'40vw'  }}    >

                            <IconButton type="submit" sx={{  }} aria-label="search">
                                <SearchIcon sx={{ pl:'3px' }}  />
                            </IconButton>

                            <InputBase id='inputText' placeholder="Escribe tu ciudad"  inputProps={{ 'aria-label': 'search google maps' }}  />

                            <Divider sx={{  }} orientation="vertical" />

                            <IconButton color="primary"  aria-label="directions">
                                <CancelIcon sx={{ pl:'3px' }}/>
                            </IconButton>

                    </Paper>
            
                
                    <CardActualInfo temperatureFormat={toggleState} lat={latitud} lon={longitud} ></CardActualInfo>

            </div>
            
            {/* ------------------------------------------- */}
            
            <div>

                    <div>

                            <Stack direction="row" spacing={5}>

                                
                                    <div className={ toggleState === 1 ? 'tab-activate' : 'tab-desactivate' } onClick={ () => toggleTab('celcius') }><div>ºc</div></div>
                                

                                
                                    <div className={ toggleState === 2 ? 'tab-activate' : 'tab-desactivate' } onClick={ () => toggleTab('farenheit') }>f</div>
                              


                                
                            </Stack>

                    </div>

                    <RestInfo lat={latitud} lon={longitud}></RestInfo>

            </div>
        
        </div>

    )
}