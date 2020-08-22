import { Cell } from "../Model/types"

export default abstract class Tool {
    public abstract onCellSelect(cell: Cell): void
}