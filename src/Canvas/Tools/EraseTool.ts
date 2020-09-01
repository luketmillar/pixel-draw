import Tool from "./BaseTool"
import { Cell } from "../Model/types"
import drawing, { getCellKey } from "../Model/drawing"
import { getLineCells } from "./drawLine"

class EraseTool extends Tool {
    public static type = 'erase'

    private lastCell: Cell | undefined

    public onStart = (cell: Cell) => {
        drawing.startOverride()
        drawing.setColor(getCellKey(cell), undefined)
        this.lastCell = cell
    }

    public onMove = (cell: Cell) => {
        if (this.lastCell === undefined) {
            return
        }
        const cells = getLineCells(this.lastCell, cell)
        cells.forEach(cell => {
            drawing.setColor(getCellKey(cell), undefined)
        })
        this.lastCell = cell
    }

    public onEnd = (cell: Cell) => {
        drawing.setColor(getCellKey(cell), undefined)
        drawing.endOverride()
        this.lastCell = undefined
    }
}
export default new EraseTool()