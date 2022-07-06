import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const APIFetch = () => {
    const [weatherAPI, setWeatherAPI] = useState({}) 
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [coords, setCoords] = useState({})
    const [iconURL, setIconURL] = useState("http://openweathermap.org/img/w/")
    const [temperature, setTemperature] = useState(0)
    const [units, setUnits] = useState("Celsius")
    const [isCelsius, setIsCelsius] = useState(true)

    function getGeolocation(pos){
        setCoords(pos.coords)
        setLatitude(coords.latitude)
        setLongitude(coords.longitude)
    }

    navigator.geolocation.getCurrentPosition(getGeolocation)

    useEffect(() => {
        axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cffb74d51f833714db7bcd06f26f2446&units=metric` )
            .then( res => {
                setWeatherAPI(res.data)
                setIconURL(`http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`)
                setTemperature(res.data.main.temp)
                console.log(weatherAPI)
            })
    }, [ latitude ])

    function changeUnits(){
        if(isCelsius){
            setTemperature((temperature*9/5)+32)
            setIsCelsius(false)
            setUnits("Fahrenheit")
        }else{
            setTemperature((temperature - 32)*5/9)
            setIsCelsius(true)
            setUnits("Celsius")
        }
    }

    return (
        <div className="father-box">
            <div className='contents'>
                <h1>Weather App</h1>
                <h2>{weatherAPI.name}, {weatherAPI.sys?.country}</h2>
                <div className="middle-info">
                    <div className="icon-box">
                        <img src={iconURL} alt="" />
                        <h3>{temperature.toFixed()}° {units}</h3>
                    </div>
                    <div className="text-box">
                        <h3>{weatherAPI.weather?.[0].main}</h3>
                        <h4>{weatherAPI.weather?.[0].description}</h4>
                    </div>
                </div>
                <button onClick={changeUnits}>Change C°/F°</button>
            </div>
        </div>
    );
};

export default APIFetch;