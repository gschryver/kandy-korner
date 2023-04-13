export const CandySearchBar = ({ setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="candy-search">What candy are you looking for?</label>
      <input
        type="text"
        id="candy-search"
        placeholder="Search for candy..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default CandySearchBar
