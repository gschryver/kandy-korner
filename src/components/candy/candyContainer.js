import { useState, useEffect } from 'react';
import CandySearchBar from './CandySearchBar';
import CandyList from './CandyList';

export const CandyContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candyResults, setCandyResults] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8088/inventory')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCandy = data.filter((candy) =>
        candy.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setCandyResults(filteredCandy);
    }
  }, [searchTerm, data]);

  return (
    <div>
      <CandySearchBar setSearchTerm={setSearchTerm} />
      <CandyList candyData={candyResults} />
    </div>
  );
};
