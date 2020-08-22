import React from 'react'
import { CellSize } from '../Model/size'
import InputHandler from '../Model/inputHandler'
import DrawTool from '../Tools/DrawTool'

interface IProps {
    rows: number
    columns: number
}

const useInputHandler = (rows: number, columns: number, inputRef: React.RefObject<HTMLDivElement>) => {
    React.useEffect(() => {
        InputHandler.updateSize(rows, columns)
    }, [columns, rows])
    React.useEffect(() => {
        InputHandler.setCanvasRect(inputRef.current!.getBoundingClientRect())
        window.addEventListener('mousemove', InputHandler.onMouseMove)
        window.addEventListener('mouseup', InputHandler.onMouseUp)
        return () => {
            window.removeEventListener('mousemove', InputHandler.onMouseMove)
            window.removeEventListener('mouseup', InputHandler.onMouseUp)
        }
    }, [inputRef])
    React.useEffect(() => {
        const drawTool = new DrawTool()
        return InputHandler.subscribeCellSelect(drawTool.onCellSelect)
    }, [])
    return InputHandler
}

const InputLayer = ({ rows, columns }: IProps) => {
    const inputRef = React.useRef<HTMLDivElement>(null)
    const inputHandler = useInputHandler(rows, columns, inputRef)
    return <div ref={inputRef} style={{ width: columns * CellSize, height: rows * CellSize }} onMouseDown={inputHandler.onMouseDown} />
}

export default React.memo(InputLayer)