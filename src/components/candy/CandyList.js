const CandyList = ({ candyData }) => {
  return (
    <div>
      <h2>Results:</h2>
      <ul>
        {candyData.map((candy) => (
          <li key={candy.id}>
            {candy.name} - ${candy.pricePerUnit.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandyList
