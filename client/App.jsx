import React from 'react'
import LedControl from './components/Controllers/Light/LedControl'

function App() {
  return (
    <div>
    <LedControl address="192.168.18.195"/>
    </div>
  )
}

export default App