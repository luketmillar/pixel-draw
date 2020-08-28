import React from 'react'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'

const Tools = () => {
    const setColor = (color: string) => {
        if (ToolStack.currentTool) {
            ToolStack.currentTool.penColor = color
        }
    }
    return (
        <div>
            <ColorSquare color="#000" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#FFF" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#540d6e" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#ee4266" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#ffd23f" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#3bceac" onSelect={setColor} />
            <div style={{ height: 5 }} />
            <ColorSquare color="#0ead69" onSelect={setColor} />
        </div>
    )
}

const useCurrentColor = () => {
    const tool = useCurrentTool()
    return tool?.penColor
}

const ColorSquare = ({ color, onSelect }: { color: string, onSelect: (color: string) => void }) => {
    const currentColor = useCurrentColor()
    const selected = currentColor === color
    return (
        <div style={{ border: selected ? '4px solid #136D89' : '1px solid #333', width: 40, height: 40, backgroundColor: color, borderRadius: 2 }} onClick={() => onSelect(color)} />
    )
}

export default React.memo(Tools)