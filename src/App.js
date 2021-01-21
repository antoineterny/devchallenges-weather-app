import "./App.scss"
import Today from "./Today"
import Forecast from "./Forecast"
import Highlights from "./Highlights"
import SearchPanel from "./SearchPanel"
import React from "react"

// FAKE DATA //////////////////////////
// import parisWeather from "./paris.json"
// import querySan from "./query_san.json"


class App extends React.Component {
  state = {
    localLat: null,
    localLong: null,
    city: "Paris",
    searchTerm: "",
    searchResult: [],
    woeid: 615702,
    weather: {},
    searchVisible: false,
    fahrenheit: false,
  }
  componentDidMount() {
    // this.setState({ weather: parisWeather, searchResult: querySan })
    this.getCurrentPosition()
  }

  getCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ localLat: pos.coords.latitude, localLong: pos.coords.longitude })
        this.getWoeidByLatLong(pos.coords.latitude, pos.coords.longitude)
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
    // console.log(data)
    this.setState({ searchResult: data })
  }

  getWeather = async woeid => {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const baseURL = "www.metaweather.com/api/location/"
    const response = await fetch(corsAnywhere + baseURL + woeid + "/")
    const data = await response.json()
    // console.log(data)
    this.setState({ weather: data, searchVisible: false })
    return data
  }

  handleFormChange = event => this.setState({ searchTerm: event.target.value })

  handleFormSubmit = event => {
    event.preventDefault()
    this.getWoeidBySearch(this.state.searchTerm)
  }

  handleFahrenheitClick = val => {
    if (val === 0) this.setState({ fahrenheit: false })
    else this.setState({ fahrenheit: true })
  }

  handleSearchVisibleClick = () => this.setState({ searchVisible: !this.state.searchVisible })

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.weather).length > 0 ? (
          <React.Fragment>
            <Today
              weather={this.state.weather.consolidated_weather[0]}
              city={this.state.weather.title}
              fahrenheit={this.state.fahrenheit}
              handleSearchVisibleClick={this.handleSearchVisibleClick}
              getCurrentPosition={this.getCurrentPosition}
            />
            <div className="details">
              <Forecast
                weather={this.state.weather.consolidated_weather}
                fahrenheit={this.state.fahrenheit}
                handleFahrenheitClick={this.handleFahrenheitClick}
              />
              <Highlights weather={this.state.weather.consolidated_weather[0]} />
              <footer>
                Data by <a href="https://www.metaweather.com/">MetaWeather.com</a>
                <br />
                Antoine Terny @ DevChallenges.io
              </footer>
            </div>
          </React.Fragment>
        ) : (
          <p>Charging weather data... (please check that geolocation is allowed in your browser)</p>
        )}
        <SearchPanel
          searchVisible={this.state.searchVisible}
          searchResult={this.state.searchResult}
          searchTerm={this.state.searchTerm}
          handleFormSubmit={this.handleFormSubmit}
          handleFormChange={this.handleFormChange}
          handleSearchVisibleClick={this.handleSearchVisibleClick}
          getWeather={this.getWeather}
        />
      </div>
    )
  }
}

export default App
