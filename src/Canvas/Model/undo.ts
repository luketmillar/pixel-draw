import drawing from "./drawing"

export type Change = { cellKey: string, before: string | undefined, after: string | undefined }

export class Undo {
    public readonly changes: Change[]

    constructor(changes: Change[]) {
        this.changes = changes
    }

    public undo = () => {
        drawing.applyUndo(this)
    }

    public redo = () => {
        drawing.applyRedo(this)
    }
}

class UndoStack {
    private stack: Undo[] = []
    private pointer: number = 0

    public push = (undo: Undo) => {
        this.stack = this.stack.slice(0, this.pointer)
        this.stack.push(undo)
        this.pointer = this.stack.length
    }

    public undo = () => {
        if (this.pointer === 0) {
            return
        }
        this.pointer--
        const undo = this.stack[this.pointer]
        undo.undo()
    }

    public redo = () => {
        if (this.pointer === this.stack.length) {
            return
        }
        const undo = this.stack[this.pointer]
        undo.redo()
        this.pointer++
    }
}

export default new UndoStack()