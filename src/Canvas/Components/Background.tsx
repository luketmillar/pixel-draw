import React from 'react'
import { GridColor } from './styles'
import { CellSize } from '../Model/size'

interface IProps {
    rows: number
    columns: number
    backgroundColor: string | undefined
}
const Background = ({ rows, columns, backgroundColor }: IProps) => {
    return <div style={
        {
            width: columns * CellSize,
            height: rows * CellSize,
            backgroundColor,
            border: `2px solid ${GridColor}`,
            boxSizing: 'border-box'
        }} />
}


export default Background