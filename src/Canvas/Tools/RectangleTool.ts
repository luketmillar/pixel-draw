import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"

export default class DrawTool extends Tool {
    private startCell: Cell | undefined

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onStart = (cell: Cell) => {
        drawing.startOverride()
        this.startCell = cell
        drawing.setColor(getCellKey(cell), this.penColor)
    }

    public onMove = (cell: Cell) => {
        if (this.startCell === undefined) {
            return
        }
        drawing.endOverride(true)
        drawing.startOverride()
        this.drawRectangle(this.startCell, cell)

    }

    public onEnd = (cell: Cell) => {
        drawing.endOverride(true)
        if (this.startCell === undefined) {
            return
        }
        drawing.startOverride()
        this.drawRectangle(this.startCell, cell)
        drawing.endOverride()
        this.startCell = undefined
    }

    private drawRectangle = (a: Cell, b: Cell) => {
        const minRow = Math.min(a.row, b.row)
        const maxRow = Math.max(a.row, b.row)
        const minColumn = Math.min(a.column, b.column)
        const maxColumn = Math.max(a.column, b.column)
        for (let row = minRow; row <= maxRow; row++) {
            for (let column = minColumn; column <= maxColumn; column++) {
                drawing.setColor(getCellKey({ row, column }), this.penColor)
            }
        }
    }
}