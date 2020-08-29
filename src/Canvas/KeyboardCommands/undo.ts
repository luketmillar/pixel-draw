import BaseCommand from './BaseCommand'
import UndoStack from '../Model/undo'

class Undo extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return e.metaKey && !e.shiftKey && e.key === 'z'
    }
    public do() {
        UndoStack.undo()
    }
}

export default new Undo()