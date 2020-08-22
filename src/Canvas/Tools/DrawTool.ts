import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing from "../Model/drawing"

export default class DrawTool extends Tool {
    public onCellSelect(cell: Cell) {
        drawing.setColor(cell, 'green')
    }
}