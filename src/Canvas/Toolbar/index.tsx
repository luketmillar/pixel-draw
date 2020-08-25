import React from 'react'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import DrawTool from '../Tools/DrawTool'
import EraseTool from '../Tools/EraseTool'
import drawing from '../Model/drawing'

enum Tool {
    Draw,
    Erase
}

const useCurrentToolType = () => {
    const current = useCurrentTool()
    if (current === undefined) {
        return undefined
    }
    if (current instanceof DrawTool) {
        return Tool.Draw
    } else {
        return Tool.Erase
    }
}

const Toolbar = () => {
    const setTool = (toolType: Tool) => {
        if (toolType === Tool.Draw) {
            ToolStack.replace(new DrawTool())
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
        (ToolStack.currentTool as DrawTool).penColor = color
    }
    React.useEffect(() => {
        if (currentToolType === Tool.Draw) {
            changeColor('#000')
        }
    }, [currentToolType])
    return (
        <div>
            <button style={{ backgroundColor: currentToolType === Tool.Draw ? 'gray' : undefined }} onClick={() => setTool(Tool.Draw)}>Draw</button>
            <button style={{ backgroundColor: currentToolType === Tool.Erase ? 'gray' : undefined }} onClick={() => setTool(Tool.Erase)}>Erase</button>
            <button onClick={reset}>Reset</button>
            {
                currentToolType === Tool.Draw && (
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