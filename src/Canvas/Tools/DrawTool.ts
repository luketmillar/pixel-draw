import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"
import { getLineCells } from "./drawLine"

class DrawTool extends Tool {
    public static type = 'draw'

    private lastCell: Cell | undefined

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onStart = (cell: Cell) => {
        drawing.startOverride()
        drawing.setColor(getCellKey(cell), this.penColor)
        this.lastCell = cell
    }

    public onMove = (cell: Cell) => {
        if (this.lastCell === undefined) {
            return
        }
        const cells = getLineCells(this.lastCell, cell)
        cells.forEach(cell => {
            drawing.setColor(getCellKey(cell), this.penColor)
        })
        this.lastCell = cell
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), this.penColor)
        drawing.endOverride()
        this.lastCell = undefined
    }
}

export default new DrawTool()