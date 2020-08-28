import React from 'react'
import ToolButton from './Tool'
import Pencil from './img/pencil.png'
import Fill from './img/fill.png'
import Rectangle from './img/rectangle.png'
import Eraser from './img/eraser.png'
import DrawTool from '../Tools/DrawTool'
import Tool from '../Tools/BaseTool'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import FillTool from '../Tools/FillTool'
import RectangleTool from '../Tools/RectangleTool'
import EraseTool from '../Tools/EraseTool'

const Tools = () => {
    const tool = useCurrentTool()
    const setTool = (tool: Tool) => {
        ToolStack.replace(tool)
    }
    React.useEffect(() => {
        setTool(DrawTool)
    }, [])
    return (
        <div>
            <ToolButton imgSrc={Pencil} selected={tool === DrawTool} onClick={() => setTool(DrawTool)} />
            <div style={{ height: 5 }} />
            <ToolButton imgSrc={Fill} selected={tool === FillTool} onClick={() => setTool(FillTool)} />
            <div style={{ height: 5 }} />
            <ToolButton imgSrc={Rectangle} selected={tool === RectangleTool} onClick={() => setTool(RectangleTool)} />
            <div style={{ height: 5 }} />
            <ToolButton imgSrc={Eraser} selected={tool === EraseTool} onClick={() => setTool(EraseTool)} />
        </div>
    )
}

export default React.memo(Tools)