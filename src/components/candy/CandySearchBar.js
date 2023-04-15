// Render the search bar for the user to search for candy & filter them by name 
const CandySearchBar = ({ setSearchTerm }) => {
  const handleSearch = (event) => { 
    setSearchTerm(event.target.value)
  }

  return (
    <div className="candy-search-bar">
      <label className="candy-name" htmlFor="candy-search">What candy are you looking for?</label>
      <input className="candy-input"
        type="text"
        id="candy-search"
        placeholder="Search for candy..."
        onChange={handleSearch}
      />
    </div>
  )
}

export default CandySearchBar
