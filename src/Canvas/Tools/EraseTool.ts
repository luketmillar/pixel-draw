import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"

class EraseTool extends Tool {
    public static type = 'erase'

    public onStart = (cell: Cell) => {
        drawing.startOverride()
        drawing.setColor(getCellKey(cell), undefined)
    }

    public onMove = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), undefined)
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), undefined)
        drawing.endOverride()
    }
}
export default new EraseTool()