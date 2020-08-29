import BaseCommand from './BaseCommand'
import toolStack from '../Tools/ToolStack'
import FillTool from '../Tools/FillTool'


class Fill extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return !e.metaKey && !e.shiftKey && e.key === 'f'
    }
    public do() {
        toolStack.replace(FillTool)
    }
}

export default new Fill()