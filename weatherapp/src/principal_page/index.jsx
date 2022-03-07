import { useState } from 'react';



import ActualInfo from '../components/actual_info';
import RestInfo from '../components/rest_info';
import './style.css';

export default function PrincipalPage(){

    const [ ciudad, updateCiudad ] = useState('Madrid');

    return(

        <div className="card_container">
            
            <div>
                
                <div>buscador</div>

                <ActualInfo cityFromSearch={ciudad}></ActualInfo>

            </div>
            
            {/* ------------------------------- */}
            
            <div>

                <div>switch celcius farengeit</div>

                <RestInfo></RestInfo>

            </div>
        
        </div>

    )
}