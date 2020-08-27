import React from 'react'
import UndoStack from '../Model/undo'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import DrawTool from '../Tools/DrawTool'
import EraseTool from '../Tools/EraseTool'
import drawing from '../Model/drawing'
import FillTool from '../Tools/FillTool'

enum Tool {
    Draw,
    Fill,
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
        (ToolStack.currentTool as (DrawTool | FillTool)).penColor = color
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <button style={{ backgroundColor: currentToolType === Tool.Draw ? 'gray' : undefined }} onClick={() => setTool(Tool.Draw)}>Draw</button>
                <button style={{ backgroundColor: currentToolType === Tool.Fill ? 'gray' : undefined }} onClick={() => setTool(Tool.Fill)}>Fill</button>
                <button style={{ backgroundColor: currentToolType === Tool.Erase ? 'gray' : undefined }} onClick={() => setTool(Tool.Erase)}>Erase</button>
                <button onClick={reset}>Reset</button>
                <div style={{ width: 10 }} />
                <button onClick={() => UndoStack.undo()}>Undo</button>
                <button onClick={() => UndoStack.redo()}>Redo</button>
            </div>
            {
                (currentToolType === Tool.Draw || currentToolType === Tool.Fill) && (
                    <div>
                        <button onClick={() => changeColor('#000')}>Black</button>
                        <button onClick={() => changeColor('#0F0')}>Green</button>
                        <button onClick={() => changeColor('#00F')}>Blue</button>
                        <button onClick={() => changeColor('#F00')}>Red</button>
                        <button onClick={() => changeColor('#FFF')}>White</button>
                    </div>
                )
            }
        </div>
    )
}

export default Toolbar