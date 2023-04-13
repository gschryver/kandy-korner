import { useEffect, useState } from "react"

const CandyList = ({ searchTerm }) => {
  const [candyData, setCandyData] = useState([]) // candy data
  const [locationsData, setLocationsData] = useState([]) // locations data

  useEffect(() => {
    // Check if searchTerm exists before trying to access its properties
    if (searchTerm) {
      // fetch candy data and filter by search term
      fetch("http://localhost:8088/inventory")
        .then((response) => response.json())
        .then((jsonData) => {
          const filteredCandy = jsonData.filter((candy) =>
            candy.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          setCandyData(filteredCandy);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  
    // fetch locations data
    fetch("http://localhost:8088/locations")
      .then((response) => response.json())
      .then((jsonData) => {
        setLocationsData(jsonData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchTerm]);
  

  // function to render locations based on location ids
  const renderLocations = (locationIds) => {
    if (locationsData && locationIds) {
      return locationIds.map((id) => {
        const location = locationsData.find((loc) => loc.id === id)
        return location ? <li key={location.id}>{location.name}</li> : null
      })
    }
    return null
  }

  // displays an alert window with the locations where the candy is available
  const handleClick = (locationIds) => {
    const locationsList = renderLocations(locationIds)
    alert(`Available at:\n${locationsList.map((loc) => loc.props.children).join("\n")}`)
  }

  return (
    <div>
      <h2>Available Candy:</h2>
      <ul>
        {candyData.map((candy) => (
          <li key={candy.id}>
            {candy.name} - ${candy.pricePerUnit.toFixed(2)}
            <button onClick={() => handleClick(candy.locationIds)}>Show me where</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CandyList
