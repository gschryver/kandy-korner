import { useEffect, useState } from "react";

const CandyList = ({ searchTerm }) => {
  const [candyData, setCandyData] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8088/inventory")
      .then((response) => response.json())
      .then((jsonData) => {
        // Filters the candyData based on the search parameters
        const filteredCandy = jsonData.filter((candy) =>
          candy.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        // Updates the candyData state with the filtered candyData
        setCandyData(filteredCandy)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchTerm])

  return (
    <div>
      <h2>Available Candy:</h2>
      <ul>
        {candyData.map((candy) => (
          <li key={candy.id}>
            {candy.name} - ${candy.pricePerUnit.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CandyList
