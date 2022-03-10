import './style.css';

export default function OneDayCardWeek(props){

    function diaDeLaSemana(dia){
        // console.log(dia);
        if ( dia ==='' ){
            return 'not defined';
        }else{
            const date = new Date(dia*1000);
            let numberDay = date.getDay();  
            const arrayDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat' ];
            dia = arrayDays[numberDay];
            return dia;
            
        }
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

        if ( temp === 0 ) {
            return 0;
        }else{
        const num = (parseInt(temp)-273.15)*(9/5)+32
        return num.toFixed(0);
        }

    }

    return(
        <div>
            <div>
            {diaDeLaSemana(props.fecha)}
            </div>

            <div>
                {<img className='iconWeather' src={`http://openweathermap.org/img/wn/${props.iconCode}@2x.png`} />}
            </div>

            <div>

                <div>{ props.temperatureFormat ===  'celcius' ? kelvinAcelcius(props.temperatureMax) : kelvinAFahrenheit(props.temperatureMax) }º</div> 
                <div>{ props.temperatureFormat ===  'farenheit' ? kelvinAFahrenheit(props.temperatureMin) : kelvinAcelcius(props.temperatureMin)}º</div>

            </div>

        </div>
    )
}