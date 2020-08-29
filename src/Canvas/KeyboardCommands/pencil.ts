import BaseCommand from './BaseCommand'
import toolStack from '../Tools/ToolStack'
import DrawTool from '../Tools/DrawTool'

class Pencil extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return !e.metaKey && !e.shiftKey && e.key === 'p'
    }
    public do() {
        toolStack.replace(DrawTool)
    }
}

export default new Pencil()