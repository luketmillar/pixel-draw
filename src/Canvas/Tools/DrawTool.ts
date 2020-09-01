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
        this.drawPixel(cell)
        this.lastCell = cell
    }

    public onMove = (cell: Cell) => {
        if (this.lastCell === undefined) {
            return
        }
        const cells = getLineCells(this.lastCell, cell)
        cells.forEach(cell => {
            this.drawPixel(cell)
        })
        this.lastCell = cell
    }

    public onEnd = (cell: Cell) => {
        this.drawPixel(cell)
        drawing.endOverride()
        this.lastCell = undefined
    }

    private drawPixel = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), this.penColor)
    }
}

export default new DrawTool()