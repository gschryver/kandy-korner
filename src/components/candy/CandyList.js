const CandyList = ({ candyData }) => {
    return (
      <div>
        <h2>Search Results:</h2>
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