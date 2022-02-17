import React, { useState } from "react";
import axios from "axios";
import bg_img from "./assets/dark_bg.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_id}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
      className="App w-screen h-screen bg-cover bg-no-repeat"
    >
      <div className="search text-center pt-2">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter a location"
          className="
          border 
          mx-2
          text-center
          rounded-lg  
          focus: outline-none
          focus:border-indigo-500
          focus:ring-1
          placeholder:focus:text-transparent
          "
        />
      </div>
      <div className="container text-white text-center my-10 mx-auto">
        <div className="top">
          <div className="location m-3 text-4xl">
            <p>{data.name}</p>
          </div>
          <div className="bottom inline-flex m-3 items-end">
            <div className="temp mx-2 text-6xl font-bold">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description mx-2">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        </div>
        {data.name !== undefined && (
          <div>
            <div className="w-3/4 my-5 mx-auto flex justify-between bg-slate-500 rounded-lg">
              <div className="feels p-2">
                {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity p-2">
                {data.main ? <p>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind p-2">
                {data.wind ? <p>{data.wind.speed.toFixed()} Kmph</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
            <button
              className="rounded-xl p-2 bg-red-900 hover:bg-slate-700 active:bg-red-600"
              onClick={() => {
                setData({});
                console.log("pressed");
              }}
            >
              Clear
            </button>
          </div>
        )}
        {data.name === undefined && (
          <div className="font-bold text-4xl m-4">What's the weather ;)</div>
        )}
      </div>
    </div>
  );
}

export default App;
