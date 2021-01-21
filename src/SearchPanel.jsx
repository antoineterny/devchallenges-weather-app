import React from "react"

const SearchPanel = props => {
  let resultsList = []
  if (props.searchResult) {
    resultsList = (
      <ul>
        {props.searchResult.map(res => (
          <li
            key={res.latt_long}
            // onClick={() => this.setState({ city: res.title, woeid: res.woeid })}
          >
            {res.title}
            <i className="material-icons">navigate_next</i>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={props.searchVisible ? "SearchPanel visible" : "SearchPanel"}>
      <div className="close-panel" onClick={props.handleSearchVisibleClick}>
        <i className="material-icons">close</i>
      </div>
      <form onSubmit={props.handleFormSubmit}>
        <i className="material-icons">search</i>
        <input
          type="text"
          placeholder="search location"
          onChange={props.handleFormChange}
          value={props.searchTerm}
        />
        <input type="submit" value="Search" />
      </form>
      {resultsList}
    </div>
  )
}

export default SearchPanel
