import React from 'react'

import Undo from './undo'
import Redo from './redo'

const commands = [Undo, Redo]

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