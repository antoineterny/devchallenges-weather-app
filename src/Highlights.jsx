import React from "react"

const Highlights = props => {
  console.log(props)
  return (
    <div className="Highlights">
      <h3>Today's Highlights</h3>
      <div className="Highlights-cards-container">
        <div className="Highlights-card Highlights-wind">
          <h4>Wind status</h4>
          <p>
            <span>{Math.round(props.weather.wind_speed)}</span> mph
          </p>
          <div className="wind-direction">
            <i
              className="material-icons"
              style={{ transform: `rotate(${props.weather.wind_direction}deg)` }}
            >
              navigation
            </i>
            <span>{props.weather.wind_direction_compass}</span>
          </div>
        </div>

        <div className="Highlights-card Highlights-humidity">
          <h4>Humidity</h4>
          <p>
            <span>{props.weather.humidity}</span>%
          </p>
          <div>
            <div className="humidity-gauge-markers">
              <div>0</div>
              <div>50</div>
              <div>100</div>
            </div>
            <div className="humidity-gauge-level">
              <span style={{ width: `${props.weather.humidity}%` }}></span>
            </div>
            <div className="humidity-gauge-percent">%</div>
          </div>
        </div>

        <div className="Highlights-card Highlights-visibility">
          <h4>Visibility</h4>
          <p>
            <span>{props.weather.visibility.toFixed(1)}</span> miles
          </p>
        </div>

        <div className="Highlights-card Highlights-pressure">
          <h4>Air Pressure</h4>
          <p>
            <span>{props.weather.air_pressure}</span> mb
          </p>
        </div>
      </div>
    </div>
  )
}

export default Highlights
