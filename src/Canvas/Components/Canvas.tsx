import React from 'react'
import Background from './Background'
import Grid from './Grid'
import { CellSize } from '../Model/size'
import Cells from './Cells'

interface IProps {
    width: number
    height: number
}

const Canvas = (props: IProps) => {

    return <div style={{ position: 'relative', width: props.width * CellSize, height: props.height * CellSize }}>
        <Stacked>
            <Background columns={props.width} rows={props.height} backgroundColor={'white'} />
        </Stacked>
        <Stacked>
            <Grid columns={props.width} rows={props.height} />
        </Stacked>
        <Stacked>
            <Cells columns={props.width} rows={props.height} />
        </Stacked>
    </div>
}

const Stacked = ({ children }: { children: React.ReactNode }) => <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{children}</div>

export default Canvas