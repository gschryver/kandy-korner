export const CandySearch = ({ setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <label htmlFor="candySearch">What candy are you looking for?</label>
      <input
        type="text"
        id="candySearch"
        placeholder="Type candy name..."
        onChange={handleSearch}
      />
    </div>
  )
}

