import Tool from "./BaseTool"
import React from 'react'

class ToolStack {
    private unsubscribe: (() => void) | undefined
    private _tool: Tool | undefined
    private get tool(): Tool | undefined {
        return this._tool
    }
    private set tool(tool: Tool | undefined) {
        this.unsubscribe?.()
        this._tool = tool
        this.unsubscribe = tool?.subscribe(this.notify)
    }
    private subscriptions: Array<() => void> = []

    public replace = (tool: Tool) => {
        this.tool = tool
        this.notify()
    }

    public get currentTool() {
        return this.tool
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
    const [tool, setTool] = React.useState({ tool: toolStack.currentTool })
    React.useEffect(() => {
        return toolStack.subscribe(() => setTool({ tool: toolStack.currentTool }))
    })
    return tool.tool
}


const toolStack = new ToolStack()

export default toolStack