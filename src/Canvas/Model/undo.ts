import drawing from "./drawing"
import React from 'react'

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
        this.notify()
    }

    public undo = () => {
        if (this.pointer === 0) {
            return
        }
        this.pointer--
        const undo = this.stack[this.pointer]
        undo.undo()
        this.notify()
    }

    public redo = () => {
        if (this.pointer === this.stack.length) {
            return
        }
        const undo = this.stack[this.pointer]
        undo.redo()
        this.pointer++
        this.notify()
    }


    public canUndo = () => {
        return this.pointer > 0
    }

    public canRedo = () => {
        return this.pointer < this.stack.length
    }

    private subs: Array<() => void> = []
    public subscribe = (callback: () => void) => {
        this.subs.push(callback)
        return () => {
            this.subs = this.subs.filter(s => s !== callback)
        }
    }
    private notify = () => {
        this.subs.forEach(s => s())
    }
}
const undoStack = new UndoStack()

export const useUndo = () => {
    const [canUndo, setCanUndo] = React.useState(false)
    const [canRedo, setCanRedo] = React.useState(false)

    React.useEffect(() => {
        const onChange = () => {
            setCanUndo(undoStack.canUndo())
            setCanRedo(undoStack.canRedo())
        }
        return undoStack.subscribe(onChange)
    }, [])

    return { canUndo, canRedo }
}

export default undoStack