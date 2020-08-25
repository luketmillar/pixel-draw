import { Cell } from "../Model/types"

export default abstract class Tool {
    public abstract onStart(cell: Cell): void
    public abstract onMove(cell: Cell): void
    public abstract onEnd(cell: Cell): void
}