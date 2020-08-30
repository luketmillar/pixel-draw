import React from 'react'
import MenuItem from './MenuItem'
import drawing from '../Model/drawing'
import save from '../KeyboardCommands/save'
import UndoStack, { useUndo } from '../Model/undo'

const Menu = () => {
    const { canUndo, canRedo } = useUndo()
    return <>
        <MenuItem onClick={() => drawing.clear()} label="Start-over" />
        <div style={{ width: 30 }} />
        <MenuItem onClick={() => save.do()} label="Save" />
        <div style={{ flex: 1 }} />
        <MenuItem onClick={() => UndoStack.undo()} disabled={!canUndo} label="Undo" />
        <div style={{ width: 30 }} />
        <MenuItem onClick={() => UndoStack.redo()} disabled={!canRedo} label="Redo" />
    </>
}

export default Menu