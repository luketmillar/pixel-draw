import Tool from "./BaseTool"
import React from 'react'

class ToolStack {
    private tools: Tool[] = []
    private subscriptions: Array<() => void> = []

    public push = (tool: Tool) => {
        this.tools.push(tool)
        this.notify()
    }

    public pop = () => {
        if (this.tools.length === 0) {
            return
        }
        this.tools = this.tools.slice(0, this.tools.length - 1)
        this.notify()
    }

    public replace = (tool: Tool) => {
        this.tools = [tool]
        this.notify()
    }

    public get currentTool() {
        if (this.tools.length === 0) {
            return undefined
        }
        return this.tools[this.tools.length - 1]
    }

    public subscribe = (onChange: () => void) => {
        this.subscriptions.push(onChange)
        return () => {
            this.subscriptions = this.subscriptions.filter(s => s !== onChange)
        }
    }

    private notify = () => {
        this.subscriptions.forEach(s => s())
    }
}

export const useCurrentTool = () => {
    const [tool, setTool] = React.useState(toolStack.currentTool)
    React.useEffect(() => {
        return toolStack.subscribe(() => setTool(toolStack.currentTool))
    })
    return tool
}

const toolStack = new ToolStack()

export default toolStack