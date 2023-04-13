import { useState, useEffect } from 'react'
import CandySearch from './components/CandySearch'
import CandyList from './components/CandyList'

export function FindCandy() {
  const [searchTerm, setSearchTerm] = useState('')
  const [candyResults, setCandyResults] = useState([])

  useEffect(() => {
    const filteredCandy = data.inventory.filter((candy) =>
      candy.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    setCandyResults(filteredCandy)
  }, [searchTerm])

  return (
    <div>
      <CandySearch setSearchTerm={setSearchTerm} />
      <CandyList candyData={candyResults} />
    </div>
  )
}