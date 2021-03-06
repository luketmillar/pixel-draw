import React from 'react'
import { CellSize } from '../Model/size'
import InputHandler from '../Model/inputHandler'
import { Cell } from '../Model/types'
import ToolStack from '../Tools/ToolStack'

interface IProps {
    rows: number
    columns: number
}

const handleMouseDown = (e: React.MouseEvent) => {
    InputHandler.onMouseDown({ x: e.clientX, y: e.clientY }, { metaKey: e.metaKey })
}
const handleMouseMove = (e: MouseEvent) => {
    InputHandler.onMouseMove({ x: e.clientX, y: e.clientY })
}
const handleMouseUp = (e: MouseEvent) => {
    InputHandler.onMouseUp()
}
const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length !== 1) {
        return
    }
    e.stopPropagation()
    const touch = e.touches[0]
    InputHandler.onMouseDown({ x: touch.clientX, y: touch.clientY })
}
const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length !== 1) {
        return
    }
    e.stopPropagation()
    const touch = e.touches[0]
    InputHandler.onMouseMove({ x: touch.clientX, y: touch.clientY })
}
const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length !== 0) {
        return
    }
    e.stopPropagation()
    InputHandler.onMouseUp()
}

const useInputHandler = (rows: number, columns: number, inputRef: React.RefObject<HTMLDivElement>) => {
    React.useEffect(() => {
        InputHandler.updateSize(rows, columns)
    }, [columns, rows])
    React.useEffect(() => {
        InputHandler.setRef(inputRef.current!)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('touchmove', handleTouchMove)
        window.addEventListener('touchend', handleTouchEnd)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [inputRef])
    React.useEffect(() => {
        return InputHandler.subscribe({
            onStart: (cell: Cell) => ToolStack.currentTool?.onStart(cell),
            onMove: (cell: Cell) => ToolStack.currentTool?.onMove(cell),
            onEnd: (cell: Cell) => ToolStack.currentTool?.onEnd(cell),
        })
    }, [inputRef])
}

const InputLayer = ({ rows, columns }: IProps) => {
    const inputRef = React.useRef<HTMLDivElement>(null)
    useInputHandler(rows, columns, inputRef)
    return <div ref={inputRef} style={{ width: columns * CellSize, height: rows * CellSize }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} />
}

export default React.memo(InputLayer)