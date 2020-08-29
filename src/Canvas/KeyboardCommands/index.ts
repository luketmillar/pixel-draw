import React from 'react'

import Undo from './undo'
import Redo from './redo'
import Eraser from './eraser'
import Pencil from './pencil'
import Rectangle from './rectangle'
import Fill from './fill'

const commands = [Undo, Redo, Eraser, Pencil, Rectangle, Fill]

export const useKeyboardCommands = () => {
    const onKeypress = (e: KeyboardEvent) => {
        const command = commands.find(c => c.matches(e))
        if (command) {
            command.do()
            e.preventDefault()
        }
    }
    React.useEffect(() => {
        window.addEventListener('keydown', onKeypress)
        return () => window.removeEventListener('keydown', onKeypress)
    }, [])
}