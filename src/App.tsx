import React from 'react'
import Canvas from './Canvas/Components/Canvas'
import './App.css'
import ColorPicker from './Canvas/ColorPicker'
import TextTools from './Canvas/Toolbar/TextTools'
import { useKeyboardCommands } from './Canvas/KeyboardCommands'
import Menu from './Canvas/Menu'
import { CellSize } from './Canvas/Model/size'
import { LayoutType, useLayoutType } from './Canvas/hooks/useWindowSize'

function App() {
  useKeyboardCommands()
  React.useEffect(() => {
    const preventBehavior = (e: TouchEvent) => {
      e.preventDefault()
    }

    document.addEventListener("touchmove", preventBehavior)
    return () => {
      document.removeEventListener("touchmove", preventBehavior)
    }
  })
  const styles = useStyles()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ height: styles.topMargin }} />
      <div style={{ display: 'flex' }}>
        <div className="toolbar" style={{ transform: `scale(${styles.scale})` }}>
          <TextTools />
          <div style={{ height: 60 }} />
          <ColorPicker />
        </div>
        <div style={{ width: styles.spacerWidth }} />
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

const useStyles = () => {
  const layoutType = useLayoutType()
  switch (layoutType) {
    case LayoutType.Desktop:
      return { scale: 1, topMargin: 100, spacerWidth: 100, }
    case LayoutType.iPad:
      return { scale: 0.8, topMargin: 40, spacerWidth: 60, }
    case LayoutType.Phone:
      return { scale: 0.6, topMargin: 10, spacerWidth: 20, }
  }
}

export default App
