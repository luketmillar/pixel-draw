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
        drawing.startOverride()
        this.throttleFill(cells, this.penColor)
    }

    private throttleFill = (cells: Cell[][], color: string) => {
        if (cells.length === 0) {
            drawing.endOverride()
            return
        }
        requestAnimationFrame(() => {
            const cellsToDraw = cells.shift()!
            cellsToDraw.forEach(cell => {
                drawing.setColor(getCellKey(cell), color)
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

    private cellsToProcess: Array<Cell | undefined> = []
    private cellsToColor: Cell[][] = [[]]

    public getFillCells = (cell: Cell): Cell[][] => {
        this.targetColor = drawing.getColor(getCellKey(cell))
        this.cellsToProcess.push(cell)
        this.cellsToProcess.push(undefined)
        while (this.cellsToProcess.filter(c => c !== undefined).length > 0) {
            const cell = this.cellsToProcess.shift()
            if (cell === undefined) {
                this.cellsToProcess.push(undefined)
                this.cellsToColor.push([])
            } else {
                this.processCell(cell)
            }
        }
        return this.cellsToColor
    }

    private processCell = (cell: Cell) => {
        if (this.shouldProcess(cell)) {
            return
        }
        this.cellsToColor[this.cellsToColor.length - 1].push(cell)
        this.seeCell(cell)
        const neighbors = this.getNeighbors(cell)
        this.cellsToProcess = [...this.cellsToProcess, ...neighbors]
    }

    private shouldProcess = (cell: Cell) => {
        return this.wasCellSeen(cell) || drawing.getColor(getCellKey(cell)) !== this.targetColor
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