import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'
import ColorPicker from './Canvas/ColorPicker'
import TextTools from './Canvas/Toolbar/TextTools'
import { useKeyboardCommands } from './Canvas/KeyboardCommands'
import Menu from './Canvas/Menu'
import { CellSize } from './Canvas/Model/size'
import { useLayoutType } from './Canvas/hooks/useWindowSize'

function App() {
  useKeyboardCommands()
  const layoutType = useLayoutType()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div className="topSpacer" />
      <div style={{ display: 'flex' }}>
        <div className="toolbar">
          <TextTools />
          <div style={{ height: 60 }} />
          <ColorPicker />
        </div>
        <div style={{ width: 100 }} />
        <div style={{ flex: 1 }}>
          <Canvas width={40} height={40} />
          <div style={{ height: 20 }} />
          <div style={{ display: 'flex', width: 40 * CellSize }}>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
