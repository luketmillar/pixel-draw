import BaseCommand from './BaseCommand'
import toolStack from '../Tools/ToolStack'
import RectangleTool from '../Tools/RectangleTool'

class Rectangle extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return !e.metaKey && !e.shiftKey && e.key === 'r'
    }
    public do() {
        toolStack.replace(RectangleTool)
    }
}

export default new Rectangle()