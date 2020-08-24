import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing from "../Model/drawing"

export default class DrawTool extends Tool {
    private penColor: string = '#000'

    public setPenColor(color: string) {
        this.penColor = color
    }

    public onCellSelect = (cell: Cell) => {
        drawing.setColor(cell, this.penColor)
    }

}