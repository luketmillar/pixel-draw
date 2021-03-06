import React from 'react'
import ToolStack, { useCurrentTool } from '../Tools/ToolStack'
import ColorPalettes from './ColorPalettes'
import PreviousImg from './img/prev.png'
import PreviousImgHovered from './img/prev_hovered.png'
import NextImg from './img/next.png'
import NextImgHovered from './img/next_hovered.png'
import useHover from '../hooks/useHover'
import Button from '../Components/Button'

const getColorRows = (index: number) => {
    const colorPalette = [...ColorPalettes[index]]
    const colorRows: string[][] = []
    while (colorPalette.length > 0) {
        colorRows.push(colorPalette.splice(0, 3))
    }
    return colorRows
}

let index = 0

const ColorPicker = () => {
    const [colorPaletteIndex, setColorPaletteIndex] = React.useState(index)
    const setColor = (color: string) => {
        if (ToolStack.currentTool) {
            ToolStack.currentTool.penColor = color
        }
    }
    const setColorPalette = (i: number) => {
        index = i
        setColorPaletteIndex(i)
        setColor(ColorPalettes[i][0])
    }
    const previousColorPalette = () => {
        if (colorPaletteIndex === 0) {
            setColorPalette(ColorPalettes.length - 1)
        } else {
            setColorPalette(colorPaletteIndex - 1)
        }
    }
    const nextColorPalette = () => {
        if (colorPaletteIndex + 1 >= ColorPalettes.length) {
            setColorPalette(0)
        } else {
            setColorPalette(colorPaletteIndex + 1)
        }
    }
    const colorRows = getColorRows(colorPaletteIndex)
    return (
        <>
            <div style={{ display: 'flex', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', borderRadius: 10, overflow: 'hidden' }}>
                <ColorSquare color="#000" onSelect={setColor} />
                <ColorSquare color="#333" onSelect={setColor} />
                <ColorSquare color="#FFF" onSelect={setColor} />
            </div>
            <div style={{ height: 20 }} />
            <div style={{ boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', borderRadius: 10, overflow: 'hidden' }}>
                {colorRows.map((row, i) => (
                    <div style={{ display: 'flex' }} key={i}>
                        {row.map((color, j) => (
                            <ColorSquare key={j} color={color} onSelect={setColor} />
                        ))}
                    </div>
                ))}
            </div>
            <div style={{ height: 20 }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 150 }}>
                    <PreviousButton onClick={previousColorPalette} />
                    <NextButton onClick={nextColorPalette} />
                </div>
            </div>
        </>
    )
}

export const useCurrentColor = () => {
    const tool = useCurrentTool()
    return tool?.penColor
}

export const ColorSquare = ({ color, onSelect }: { color: string, onSelect: (color: string) => void }) => {
    const currentColor = useCurrentColor()
    const selected = currentColor === color
    return (
        <Button style={{ width: 90, height: 90, backgroundColor: color, display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }} onClick={() => onSelect(color)}>
            {selected && <div style={{ width: 40, height: 40, backgroundColor: 'white', border: '4px solid #222', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 20, height: 20, backgroundColor: color, border: '4px solid #222', }} />
            </div>}
        </Button>
    )
}

const PreviousButton = ({ onClick }: { onClick: () => void }) => <ArrowButton onClick={onClick} defaultSrc={PreviousImg} hoveredSrc={PreviousImgHovered} alt="Previous color palette" />
const NextButton = ({ onClick }: { onClick: () => void }) => <ArrowButton onClick={onClick} defaultSrc={NextImg} hoveredSrc={NextImgHovered} alt="Next color palette" />

const ArrowButton = ({ onClick, defaultSrc, hoveredSrc, alt }: { onClick: () => void, defaultSrc: string, hoveredSrc: string, alt: string }) => {
    const [isHovered, ref] = useHover()
    return (
        <Button ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, cursor: 'pointer' }} onClick={onClick}>
            <img style={{ imageRendering: 'pixelated' }} src={isHovered ? hoveredSrc : defaultSrc} alt={alt} />
        </Button>
    )
}

export default React.memo(ColorPicker)
