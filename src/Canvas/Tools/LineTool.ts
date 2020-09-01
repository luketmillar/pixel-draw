import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"
import { getLineCells } from "./drawLine"

class LineTool extends Tool {
    public static type = 'line'

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
        this.drawLine(this.startCell, cell)

    }

    public onEnd = (cell: Cell) => {
        drawing.endOverride(true)
        if (this.startCell === undefined) {
            return
        }
        drawing.startOverride()
        this.drawLine(this.startCell, cell)
        drawing.endOverride()
        this.startCell = undefined
    }

    private drawLine = (from: Cell, to: Cell) => {
        const cells = getLineCells(from, to)
        cells.forEach(cell => {
            drawing.setColor(getCellKey(cell), this.penColor)
        })
    }
}

export default new LineTool()