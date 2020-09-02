import React from 'react'
import TextTool from './TextTool'
import DrawTool from '../Tools/DrawTool'
import Tool from '../Tools/BaseTool'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import FillTool from '../Tools/FillTool'
import RectangleTool from '../Tools/RectangleTool'
import EraseTool from '../Tools/EraseTool'
import LineTool from '../Tools/LineTool'
import MobileColorPicker from '../ColorPicker/MobilePicker'

const tools = [DrawTool, FillTool, RectangleTool, LineTool, EraseTool]
const toolNames = ['Pencil', 'Fill', 'Rectangle', 'Line', 'Eraser']

const MobileToolPicker = () => {
    const indexRef = React.useRef(0)
    useCurrentTool()
    const setTool = (tool: Tool) => {
        ToolStack.replace(tool)
    }
    const toggleTool = () => {
        let nextIndex = indexRef.current + 1
        if (nextIndex === tools.length) {
            nextIndex = 0
        }
        indexRef.current = nextIndex
        setTool(tools[nextIndex])
    }
    React.useEffect(() => {
        setTool(DrawTool)
    }, [])
    return <TextTool name={toolNames[indexRef.current]} selected={true} dontOffset={true} onClick={toggleTool} />
}

const Tools = () => {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <MobileToolPicker />
            <MobileColorPicker />
        </div>
    )
}

export default React.memo(Tools)