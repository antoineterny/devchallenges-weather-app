import React from "react"

const ForecastCard = props => {
  const today = new Date()
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  console.log(props)
  const applicableDate = new Date(props.dat.applicable_date)
  const applicableDay =
    applicableDate.getDay() === today.getDay() + 1
      ? "Tomorrow"
      : `${days[applicableDate.getDay()]}, ${applicableDate.getDate()} ${
          months[applicableDate.getMonth()]
        }`
  return (
    <div className="Forecast-card" key={props.dat.id}>
      <div className="Forecast-card-header">{applicableDay}</div>
      <div className="Forecast-card-icon">
        <img src={`./img/${props.dat.weather_state_abbr}.png`} alt="" />
      </div>
      <div className="Forecast-card-temperatures">
        <span className="max">{Math.round(props.dat.max_temp)}°C</span>
        <span className="min">{Math.round(props.dat.min_temp)}°C</span>
      </div>
    </div>
  )
}

const Forecast = props => {
  const forecastData = props.weather.slice(1)

  return (
    <div className="Forecast">
      {/* <div className="Forecast-content"> */}
        <div className="Forecast-header">
          <button id="celsius">°C</button>
          <button id="fahrenheit">°F</button>
        </div>
        <div className="Forecast-cards">
          {forecastData.map(dat => (
            <ForecastCard dat={dat} key={dat.id} />
          ))}
        </div>
      {/* </div> */}
    </div>
  )
}
export default Forecast
