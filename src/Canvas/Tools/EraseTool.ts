import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing from "../Model/drawing"

export default class EraseTool extends Tool {
    public onCellSelect = (cell: Cell) => {
        drawing.setColor(cell, undefined)
    }

}