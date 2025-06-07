import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * WeatherPage - Lets user enter a city, fetches weather using OpenWeatherMap API (API key from .env), and displays current and 5-day forecast
 */
function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // get API key from environment variable
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // PUBLIC_INTERFACE
  /** Handles city input */
  function handleInput(e) { setCity(e.target.value); }

  // PUBLIC_INTERFACE
  /** Fetches weather & forecast on submit */
  async function handleSubmit(e) {
    e.preventDefault();
    setWeather(null); setForecast(null); setLoading(true); setError("");
    // API URLs
    let base = "https://api.openweathermap.org/data/2.5";
    try {
      if (!city) throw new Error("Please enter a city name.");
      if (!apiKey) throw new Error("OpenWeatherMap API key not set in .env");

      // current weather
      const resp = await fetch(`${base}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      if (!resp.ok) throw new Error("City not found.");
      const w = await resp.json();
      setWeather(w);

      // 5-day/3hr forecast
      const respF = await fetch(`${base}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      if (!respF.ok) throw new Error("Error fetching forecast.");
      const f = await respF.json();
      // Reduce forecast to 1/day at mid-day, best effort
      const oneDay = {};
      for (let entry of f.list) {
        let date = entry.dt_txt.split(" ")[0];
        if (!oneDay[date] && entry.dt_txt.includes("12:00:00")) {
          oneDay[date] = entry;
        }
      }
      setForecast(Object.values(oneDay));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError((err && err.message) || "Failed to fetch weather data.");
    }
  }

  // Helper: weather icon url
  function owIcon(code) {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
  }

  return (
    <div className="container" style={{paddingTop:"84px", maxWidth:"460px", minHeight:"75vh"}}>
      <h1 className="title" style={{fontSize:"2.2rem",marginBottom: "12px"}}>Weather Checker</h1>
      <div className="description" style={{marginBottom:"20px"}}>Check real-time weather and a 5-day forecast for your travel destination.</div>
      <form onSubmit={handleSubmit} style={{display:"flex",gap:10,marginBottom:24}}>
        <input type="text" value={city} onChange={handleInput} placeholder="Enter city name..." style={{flex:2,padding:"10px",borderRadius:"6px"}} required autoFocus/>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Fetching..." : "Check"}</button>
      </form>
      {error && <div style={{color:"salmon",marginBottom:"16px"}}>{error}</div>}

      {weather && (
        <div style={{background:"rgba(0,154,200,0.1)",padding:"18px",borderRadius:"10px",marginBottom:"22px"}}>
          <span style={{fontWeight:600}}>{weather.name}, {weather.sys.country}</span>
          <div style={{display:'flex', alignItems:"center", gap:"13px", marginTop:'12px'}}>
            <img src={owIcon(weather.weather[0].icon)} width={52} height={52} alt="icon"/>
            <div>
              <span style={{fontSize:"1.9rem",fontWeight:700}}>{Math.round(weather.main.temp)}°C</span><br/>
              <span>{weather.weather[0].main} ({weather.weather[0].description})</span>
            </div>
          </div>
          <div style={{marginTop:"6px",fontSize:".93rem",color:"var(--text-secondary)"}}>
            Humidity: {weather.main.humidity}% &nbsp;|&nbsp; Wind: {Math.round(weather.wind.speed)} m/s
          </div>
        </div>
      )}

      {forecast && forecast.length > 0 && (
        <div>
          <div style={{fontWeight:600,marginBottom:"10px"}}>5-Day Forecast</div>
          <div style={{display:'flex',gap:"10px",flexWrap:'wrap'}}>
          {forecast.map((entry, i) => (
            <div key={i} style={{
              background:"rgba(0,92,210,0.07)",padding:"12px",borderRadius:"8px",flex:"1",minWidth:"94px",textAlign:"center"
            }}>
              <div style={{fontSize:".96rem", fontWeight:500}}>{new Date(entry.dt_txt).toLocaleDateString(undefined, {weekday:'short',month:'short',day:'numeric'})}</div>
              <img src={owIcon(entry.weather[0].icon)} width={36} height={36} alt="icon"/>
              <div style={{fontSize:"1.1rem",fontWeight:700}}>{Math.round(entry.main.temp)}°C</div>
              <div style={{fontSize:".88rem"}}>{entry.weather[0].main}</div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
