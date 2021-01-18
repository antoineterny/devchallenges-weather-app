import "./App.scss"
import React from "react"

class App extends React.Component {
  state = {
    location: "",
    lat: null,
    long: null,
    city: "",
    woeid: null,
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude }),
      err => console.log(err)
    )
  }
  componentDidUpdate() {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const baseURL = "www.metaweather.com/api/location/search/"
    const locationByQuery = "?query="
    const locationByLatLong = "?lattlong="
    fetch(corsAnywhere + baseURL + locationByLatLong + this.state.lat + "," + this.state.long)
      .then(res => res.json())
      .then(data => {
        this.setState({ city: data[0].title, woeid: data[0].woeid })
        return fetch(corsAnywhere + baseURL + data[0].woeid + "/")
      })
      .then(res => res.json())
      .then(weather => console.log(weather))
  }
  render() {
    return <div className="App"></div>
  }
}

export default App
