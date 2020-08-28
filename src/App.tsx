import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'
import Tools from './Canvas/Toolbar/Tools'
import ColorPicker from './Canvas/ColorPicker'

function App() {
  return (
    <>
      <h1>Pixel Draw</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 20 }} />
          <Tools />
          <div style={{ width: 10 }} />
          <ColorPicker />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas width={40} height={20} />
        </div>
        <div style={{ width: 100 }} />
      </div>
    </>
  )
}

export default App
