import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"

export default class FillTool extends Tool {
    public penColor: string = '#000'

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onStart = (cell: Cell) => {
        const logic = new FillLogic()
        const cells = logic.getFillCells(cell)
        this.throttleFill(cells, this.penColor)
        // cells.forEach(cell => {
        //     drawing.setColor(cell, this.penColor)
        // })
    }

    private throttleFill = (cells: Cell[], color: string) => {
        if (cells.length === 0) {
            return
        }
        setTimeout(() => {
            const cellsToDraw = cells.splice(0, 20)
            cellsToDraw.forEach(cell => {
                drawing.setColor(cell, color)
            })
            this.throttleFill(cells, color)
        }, 0)
    }

    public onMove = (cell: Cell) => { }

    public onEnd = (cell: Cell) => { }
}

class FillLogic {
    private cells: Record<string, boolean> = {}
    private targetColor: string | undefined

    public getFillCells = (cell: Cell): Cell[] => {
        this.targetColor = drawing.getColor(cell)
        return this.innerGetFillCells(cell)
    }

    private innerGetFillCells = (cell: Cell): Cell[] => {
        if (this.wasCellSeen(cell) || drawing.getColor(cell) !== this.targetColor) {
            return []
        }
        this.seeCell(cell)
        const neighbors = this.getNeighbors(cell)
        const recursiveNeighbors = neighbors.reduce((all: Cell[], neighbor) => ([...all, ...this.innerGetFillCells(neighbor)]), [])
        return [cell, ...recursiveNeighbors]
    }

    private seeCell = (cell: Cell) => {
        this.cells[getCellKey(cell)] = true
    }

    private wasCellSeen = (cell: Cell) => {
        return !!this.cells[getCellKey(cell)]
    }

    private getNeighbors = (cell: Cell) => {
        const previousRow = cell.row - 1
        const nextRow = cell.row + 1
        const previousColumn = cell.column - 1
        const nextColumn = cell.column + 1

        const top = { row: previousRow, column: cell.column }
        const left = { row: cell.row, column: previousColumn }
        const right = { row: cell.row, column: nextColumn }
        const bottom = { row: nextRow, column: cell.column }

        return [top, left, right, bottom].filter(cell => drawing.isOnCanvas(cell))
    }
}