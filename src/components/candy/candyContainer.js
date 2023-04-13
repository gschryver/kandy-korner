import { useState } from 'react'
import CandySearchBar from './CandySearchBar'
import CandyList from './CandyList'

// Container for the CandySearchBar and CandyList components
export const CandyContainer = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      {/* The CandySearchBar component takes a prop called setSearchTerm, which will be used to update the searchTerm state in this component */}
      <CandySearchBar setSearchTerm={setSearchTerm} />

      {/* The CandyList component takes a prop called searchTerm, which is the current value of the searchTerm state in this component */}
      <CandyList searchTerm={searchTerm} />
    </div>
  )
}
