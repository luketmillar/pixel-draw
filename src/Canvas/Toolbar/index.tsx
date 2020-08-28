import React from 'react'
import UndoStack from '../Model/undo'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import DrawTool from '../Tools/DrawTool'
import EraseTool from '../Tools/EraseTool'
import drawing from '../Model/drawing'
import FillTool from '../Tools/FillTool'
import RectangleTool from '../Tools/RectangleTool'

enum Tool {
    Draw,
    Fill,
    Rectangle,
    Erase
}

const useCurrentToolType = () => {
    const current = useCurrentTool()
    if (current === undefined) {
        return undefined
    }
    if (current instanceof DrawTool) {
        return Tool.Draw
    } else if (current instanceof FillTool) {
        return Tool.Fill
    } else if (current instanceof RectangleTool) {
        return Tool.Rectangle
    } else {
        return Tool.Erase
    }
}

const Toolbar = () => {
    const setTool = (toolType: Tool) => {
        if (toolType === Tool.Draw) {
            ToolStack.replace(new DrawTool())
        } else if (toolType === Tool.Fill) {
            ToolStack.replace(new FillTool())
        } else if (toolType === Tool.Rectangle) {
            ToolStack.replace(new RectangleTool())
        } else {
            ToolStack.replace(new EraseTool())
        }
    }
    const reset = () => {
        drawing.clear()
    }
    const currentToolType = useCurrentToolType()
    React.useEffect(() => {
        setTool(Tool.Draw)
    }, [])
    const changeColor = (color: string) => {
        (ToolStack.currentTool as (DrawTool | FillTool | RectangleTool)).penColor = color
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <button style={{ backgroundColor: currentToolType === Tool.Draw ? 'gray' : undefined }} onClick={() => setTool(Tool.Draw)}>Draw</button>
                <button style={{ backgroundColor: currentToolType === Tool.Fill ? 'gray' : undefined }} onClick={() => setTool(Tool.Fill)}>Fill</button>
                <button style={{ backgroundColor: currentToolType === Tool.Rectangle ? 'gray' : undefined }} onClick={() => setTool(Tool.Rectangle)}>Rectangle</button>
                <button style={{ backgroundColor: currentToolType === Tool.Erase ? 'gray' : undefined }} onClick={() => setTool(Tool.Erase)}>Erase</button>
                <button onClick={reset}>Reset</button>
                <div style={{ width: 10 }} />
                <button onClick={() => UndoStack.undo()}>Undo</button>
                <button onClick={() => UndoStack.redo()}>Redo</button>
            </div>
            {
                (currentToolType === Tool.Draw || currentToolType === Tool.Fill || currentToolType === Tool.Rectangle) && (
                    <div>
                        <Color color="#000" name="Black" onPickColor={changeColor} />
                        <Color color="#0F0" name="Green" onPickColor={changeColor} />
                        <Color color="#00F" name="Blue" onPickColor={changeColor} />
                        <Color color="#F00" name="Red" onPickColor={changeColor} />
                        <Color color="#FFF" name="White" onPickColor={changeColor} />
                    </div>
                )
            }
        </div >
    )
}

const Color = ({ color, name, onPickColor }: { color: string, name: string, onPickColor: (color: string) => void }) => (
    <button style={{ backgroundColor: ToolStack.currentTool?.penColor === color ? 'gray' : undefined }} onClick={() => onPickColor(color)}>{name}</button>
)

export default Toolbar