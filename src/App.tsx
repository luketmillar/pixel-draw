import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'
import Toolbar from './Canvas/Toolbar'

function App() {
  return (
    <>
      <h1>Pixel Draw</h1>
      <Toolbar />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Canvas width={60} height={40} />
      </div>
    </>
  )
}

export default App
