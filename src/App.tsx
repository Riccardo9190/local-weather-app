import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = React.useState<any>(false); // Setting state as any, because after API's consuming
                                                            // we'll change types

  const getWeather = async (lat: number, long: number) => {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather" , {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    console.log(res.data)
    setWeather(res.data) 
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => { // Asking permition for user location by navigator
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        Permition denied.
      </Fragment>
    )
  } else if (weather === false){
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa </li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    )
  }

}

export default App;
