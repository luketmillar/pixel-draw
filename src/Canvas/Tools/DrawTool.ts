import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"

class DrawTool extends Tool {
    public static type = 'draw'

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

export default new DrawTool()