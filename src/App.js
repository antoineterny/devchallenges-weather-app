import "./App.scss"
import parisWeather from "./paris.json"
import Today from "./Today"
import Forecast from "./Forecast"
import Highlights from "./Highlights"
import React from "react"

class App extends React.Component {
  state = {
    localLat: null,
    localLong: null,
    city: "",
    searchTerm: "",
    searchResult: [],
    woeid: null,
    weather: {},
    searchVisible: false,
    imperial: false,
  }
  componentDidMount() {
    this.setState({ weather: parisWeather })
    // this.getCurrentPosition()
  }

  getCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ localLat: pos.coords.latitude, localLong: pos.coords.longitude })
        // this.getWoeidByLatLong(pos.coords.latitude, pos.coords.longitude)
      },
      err => console.log(err)
    )
  }
  getWoeidByLatLong = async (lat, long) => {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const baseURL = "www.metaweather.com/api/location/search/?lattlong="
    const response = await fetch(corsAnywhere + baseURL + lat + "," + long)
    const data = await response.json()
    this.setState({ city: data[0].title, woeid: data[0].woeid })
    const woeid = await this.getWeather(data[0].woeid)
    return woeid
  }

  getWoeidBySearch = async term => {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const baseURL = "www.metaweather.com/api/location/search/?query="
    const response = await fetch(corsAnywhere + baseURL + term)
    const data = await response.json()
    console.log(data)
    this.setState({ searchResult: data })
  }

  getWeather = async woeid => {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const baseURL = "www.metaweather.com/api/location/"
    const response = await fetch(corsAnywhere + baseURL + woeid + "/")
    const data = await response.json()
    console.log(data)
    this.setState({ weather: data })
    return data
  }

  handleFormChange = event => this.setState({ searchTerm: event.target.value })

  handleFormSubmit = event => {
    event.preventDefault()
    this.getWoeidBySearch(this.state.searchTerm)
  }

  render() {
    // let resultsList = []
    // if (this.state.searchResult) {
    //   resultsList = (
    //     <ul>
    //       {this.state.searchResult.map(res => (
    //         <li
    //           key={res.latt_long}
    //           onClick={() => this.setState({ city: res.title, woeid: res.woeid })}
    //         >
    //           {res.title}
    //         </li>
    //       ))}
    //     </ul>
    //   )
    // }
    return (
      <div className="App">
        {/* <button onClick={() => this.getWeather(this.state.woeid)}>
          <i className="material-icons">my_location</i>
        </button>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="search location"
            onChange={this.handleFormChange}
            value={this.state.searchTerm}
          />
        </form>
        {resultsList} */}
        {Object.keys(this.state.weather).length > 0 ? (
          <React.Fragment>
            <Today
              weather={this.state.weather.consolidated_weather[0]}
              city={this.state.weather.title}
            />
            <div className="details">
              <Forecast weather={this.state.weather.consolidated_weather} />
              <Highlights weather={this.state.weather.consolidated_weather[0]} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    )
  }
}

export default App
