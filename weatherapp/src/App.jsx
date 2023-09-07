import { useState, useRef, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

import WeatherCard from "./components/WeatherCard";

function App() {
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const [data, setData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);


  const getWeather = async (event) =>{
    event.preventDefault();
    console.log(`getting weather of ${inputRef.current.value}...`);

    try{
      setIsLoading(true);

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=798ab03d7eb4479f855223326230509&q=${inputRef.current.value}&aqi=no`
      );
      console.log("response: ", response.data);
      
      setIsLoading(false);

      setData((prev) => [response.data, ...prev]);
      event.target.reset();
      console.log(data);
    }catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="app">
      <header className="app-head">
      <h2> Weather App</h2>

      <form onSubmit={getWeather} id="search">
        <label htmlFor="cityName">City: </label>
        <input type="text" id="cityName" maxLength={20} minLength={2} required ref={inputRef} />
        <br />
        <button type="submit">Search</button>       

      </form>
      </header>
      <br />
      {/* <br /> */}
      <main>
      {isLoading ? <div>Loading...</div> : null}
      {data.length || currentWeather ? null : <div>No Data </div>}

      {(data.length) ? (
        data.map((eachWeatherData, index) => <WeatherCard key={index} data={eachWeatherData} />)

      ) : null}
      {currentWeather && <WeatherCard data={currentWeather} />}
      </main>
    </div>
  );

}

export default App;
