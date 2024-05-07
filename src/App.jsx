import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let baseUrl = "api.weatherapi.com/v1";
  let apiKey = "bec7ab9c0f424020ad3233059240605";
  let today = new Date();
  let date = today.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let updateTime = `${
    today.getHours() > 12 ? today.getHours() - 12 : today.getHours()
  }:${today.getMinutes()}`;

  const [Data, setData] = useState();
  console.log(Data);

  async function getWeatherData(url) {
    let response = await fetch(url);
    let data = await response.json();
    setData(data);
  }

  useEffect(() => {
    let url = `https://${baseUrl}/current.json?key=${apiKey}&q=India`;
    try {
      if (url) {
        getWeatherData(url);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (Data) {
    return (
      <>
        <div className="main">
          <div className="info">
            <div className="loc">
              <h2 style={{padding: '1%'}}>{date}</h2>
              <h3>
                {Data.location.name}, {Data.location.country}
              </h3>
              <p style={{padding: '1%'}}>
                lat: {Data.location.lat} / lon: {Data.location.lon}
              </p>
            </div>
            <div className="temp">
              <h1>{Data.current.temp_c}</h1>
              <p>Feels like {Data.current.feelslike_c}</p>
              <img src={Data.current.condition.icon} alt=""></img>
              <p>last updated: {updateTime}</p>
            </div>
            <div className="footer">
              <div className="innerFooter">
                <div className="cond">
                  <h5>{Data.current.humidity}</h5>
                  <h5>{Data.current.condition.text}</h5>
                </div>
                <div className="wind">
                  <h5>
                    {Data.current.wind_kph}
                    {Data.current.wind_dir}
                    {Data.current.wind_degree}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
