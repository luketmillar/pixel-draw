import BaseCommand from './BaseCommand'
import toolStack from '../Tools/ToolStack'
import LineTool from '../Tools/LineTool'


class Line extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return !e.metaKey && !e.shiftKey && e.key === 'l'
    }
    public do() {
        toolStack.replace(LineTool)
    }
}

export default new Line()