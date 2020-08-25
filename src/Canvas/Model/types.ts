import React from 'react'

export type Cell = { row: number, column: number }
export type Position = { x: number, y: number }
export type Event = MouseEvent | React.MouseEvent
export type Size = { width: number, height: number }
export type CellCallback = (cell: Cell) => void
export type Callbacks = {
    onStart: CellCallback,
    onMove: CellCallback,
    onEnd: CellCallback
}
export enum Direction {
    NS,
    EW
}

export const cellsAreEqual = (a: Cell | undefined, b: Cell | undefined) => {
    return a?.row === b?.row && a?.column === b?.column
}