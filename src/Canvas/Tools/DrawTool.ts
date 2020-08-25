import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing from "../Model/drawing"

export default class DrawTool extends Tool {
    public penColor: string = '#000'

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onStart = (cell: Cell) => {
        drawing.setColor(cell, this.penColor)
    }

    public onMove = (cell: Cell) => {
        drawing.setColor(cell, this.penColor)
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(cell, this.penColor)
    }
}