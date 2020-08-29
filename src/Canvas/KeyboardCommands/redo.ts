import BaseCommand from './BaseCommand'
import UndoStack from '../Model/undo'

class Redo extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return e.metaKey && e.shiftKey && e.key === 'z'
    }
    public do() {
        UndoStack.redo()
    }
}

export default new Redo()