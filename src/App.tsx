import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'

function App() {
  return (
    <>
      <h1>Pixel Draw</h1>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Canvas width={80} height={40} />
      </div>
    </>
  )
}

export default App
