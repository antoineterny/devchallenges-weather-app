import React from "react"

const Today = props => {
  const applicableDate = new Date(props.weather.applicable_date)
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
  return (
    <div className="Today">
      <div className="Today-header">
        <button className="places">Search for places</button>
        <button className="here">
          <i className="material-icons">my_location</i>
        </button>
      </div>
      <div className="Today-image">
        <img src={`./img/${props.weather.weather_state_abbr}.png`} alt="" />
      </div>
      <div className="Today-details">
        <p className="temperature">
          <span>{Math.round(props.weather.the_temp)}</span>
          °C
        </p>
        <p className="weather-state">{props.weather.weather_state_name}</p>
        <p className="weather-time">
          Today <span>•</span> {days[applicableDate.getDay()]}, {applicableDate.getDate()}{" "}
          {months[applicableDate.getMonth()]}
        </p>
        <p className="weather-place">
          <i className="material-icons">place</i>
          {props.city}
        </p>
      </div>
    </div>
  )
}

export default Today
