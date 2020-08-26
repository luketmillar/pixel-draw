import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"

export default class DrawTool extends Tool {
    public penColor: string = '#000'

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onStart = (cell: Cell) => {
        drawing.startOverride()
        drawing.setColor(getCellKey(cell), this.penColor)
    }

    public onMove = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), this.penColor)
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), this.penColor)
        drawing.endOverride()
    }
}