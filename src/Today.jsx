import React from "react"

const Today = props => {
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
  return (
    <div className="Today">
      <img src={`./img/${props.weather.weather_state_abbr}.png`} alt="" />
      <p>{Math.round(props.weather.the_temp)}°C</p>
      <p>{props.weather.weather_state_name}</p>
      <p>Today • {days[today.getDay()]}, {today.getDate()} {months[today.getMonth()]}</p>
      <p><i className="material-icons">place</i>{props.city}</p>
    </div>
  )
}

export default Today
