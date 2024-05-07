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
  let updateTime =
    today.getHours() > 12
      ? `${today.getHours() - 12}:${today.getMinutes()} PM`
      : `${today.getHours()}:${today.getMinutes()} AM`;

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
              <h2 style={{ padding: "1%" }}>{date}</h2>
              <h3>
                {Data.location.name}, {Data.location.country}
              </h3>
              <p style={{ padding: "1%" }}>
                lat: {Data.location.lat} °N / lon: {Data.location.lon} °E
              </p>
            </div>
            <div
              className="temp"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "25px",
                  padding: "0px",
                }}
              >
                <div>
                  <h1 style={{ marginBottom: "0px" }}>
                    {Data.current.temp_c}
                    <span style={{ fontSize: "30px" }}> °C</span>
                  </h1>
                  <h5
                    style={{
                      marginTop: "6px",
                      marginLeft: "5px",
                      textAlign: "start",
                    }}
                  >
                    {Data.current.condition.text}
                  </h5>
                </div>
                <img
                  src={Data.current.condition.icon}
                  style={{ width: "60px", height: "70px" }}
                  alt=""
                ></img>
              </div>
              <div style={{ padding: "0px" }}>
                <h3>
                  feels like - {Data.current.feelslike_c}{" "}
                  <span style={{ fontSize: "15px" }}>°C</span>
                </h3>
              </div>
            </div>
            <p>
              last updated:{" "}
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                {updateTime}
              </span>
            </p>
            <div className="footer">
              <div className="innerFooter">
                <div className="cond">
                  <h5>humidt - {Data.current.humidity}%</h5>
                </div>
                <div
                  className="wind"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div>
                    <h5 style={{ marginBottom: "15px", marginTop: "0px" }}>
                      wind speed : {Data.current.wind_kph} kmph (
                      {Data.current.wind_dir} / {Data.current.wind_degree}°)
                    </h5>
                  </div>
                  {/* <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <h5 style={{marginTop: '1px'}}>wind direction : {Data.current.wind_dir}</h5>
                    <h5 style={{marginTop: '1px'}}>wind angle : {Data.current.wind_degree}°</h5>
                  </div> */}
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
