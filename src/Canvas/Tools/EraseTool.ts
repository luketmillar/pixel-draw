import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing from "../Model/drawing"

export default class EraseTool extends Tool {
    public onStart = (cell: Cell) => {
        drawing.setColor(cell, undefined)
    }

    public onMove = (cell: Cell) => {
        drawing.setColor(cell, undefined)
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(cell, undefined)
    }
}