import React from 'react'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'

const Tools = () => {
    const setColor = (color: string) => {
        if (ToolStack.currentTool) {
            ToolStack.currentTool.penColor = color
        }
    }
    return (
        <>
            <div style={{ display: 'flex', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)' }}>
                <ColorSquare color="#000" onSelect={setColor} />
                <ColorSquare color="#333" onSelect={setColor} />
                <ColorSquare color="#FFF" onSelect={setColor} />
            </div>
            <div style={{ height: 20 }} />
            <div style={{ boxShadow: '0px 0px 15px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex' }}>
                    <ColorSquare color="#540d6e" onSelect={setColor} />
                    <ColorSquare color="#ee4266" onSelect={setColor} />
                    <ColorSquare color="#ffd23f" onSelect={setColor} />
                </div>
                <div style={{ display: 'flex' }}>
                    <ColorSquare color="#3bceac" onSelect={setColor} />
                    <ColorSquare color="#0ead69" onSelect={setColor} />
                    <ColorSquare color="#2EC4F6" onSelect={setColor} />
                </div>
            </div>
        </>
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
        <div style={{ width: 90, height: 90, backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onSelect(color)}>
            {selected && <div style={{ width: 40, height: 40, backgroundColor: 'white', border: '4px solid #222', color: '#222', borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
        </div>
    )
}

export default React.memo(Tools)