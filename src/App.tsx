import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'
import ColorPicker from './Canvas/ColorPicker'
import TextTools from './Canvas/Toolbar/TextTools'
import TextTool from './Canvas/Toolbar/TextTool'
import { useKeyboardCommands } from './Canvas/KeyboardCommands'
import drawing from './Canvas/Model/drawing'

function App() {
  useKeyboardCommands()
  return (
    <>
      <div style={{ height: 100 }} />
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: 100, marginRight: 80, width: 270 }}>
          <TextTools />
          <div style={{ height: 60 }} />
          <ColorPicker />
          <div style={{ position: 'absolute', bottom: 100 }}>
            <TextTool name="Start over" onClick={() => drawing.clear()} selected={true} dontOffset={true} />
          </div>
        </div>
        <div style={{ width: 40 }} />
        <div style={{ flex: 1 }}>
          <Canvas width={40} height={40} />
        </div>
        <div style={{ width: 100 }} />
      </div>
    </>
  )
}

export default App
