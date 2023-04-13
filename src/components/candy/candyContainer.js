import React from 'react'
import { CandyProvider } from './CandyProvider'
import CandySearch from './CandySearch'
import CandyList from './CandyList'

export const CandyContainer = () => {
  return (
    <CandyProvider>
      <CandySearch />
      <CandyList />
    </CandyProvider>
  )
}