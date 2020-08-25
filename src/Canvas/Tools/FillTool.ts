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
    }

    private throttleFill = (cells: Cell[], color: string) => {
        if (cells.length === 0) {
            return
        }
        requestAnimationFrame(() => {
            const cellsToDraw = cells.splice(0, 20)
            cellsToDraw.forEach(cell => {
                drawing.setColor(cell, color)
            })
            this.throttleFill(cells, color)
        })
    }

    public onMove = (cell: Cell) => { }

    public onEnd = (cell: Cell) => { }
}

class FillLogic {
    private cells: Record<string, boolean> = {}
    private targetColor: string | undefined

    private cellsToProcess: Cell[] = []
    private cellsToColor: Cell[] = []

    public getFillCells = (cell: Cell): Cell[] => {
        this.targetColor = drawing.getColor(cell)
        this.cellsToProcess.push(cell)
        while (this.cellsToProcess.length > 0) {
            const cell = this.cellsToProcess.shift()!
            this.processCell(cell)
        }
        return this.cellsToColor
    }

    private processCell = (cell: Cell) => {
        if (this.wasCellSeen(cell) || drawing.getColor(cell) !== this.targetColor) {
            return
        }
        this.cellsToColor.push(cell)
        this.seeCell(cell)
        const neighbors = this.getNeighbors(cell)
        this.cellsToProcess = [...this.cellsToProcess, ...neighbors]
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