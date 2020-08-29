import BaseCommand from './BaseCommand'
import toolStack from '../Tools/ToolStack'
import EraseTool from '../Tools/EraseTool'

class Eraser extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return !e.metaKey && !e.shiftKey && e.key === 'e'
    }
    public do() {
        toolStack.replace(EraseTool)
    }
}

export default new Eraser()