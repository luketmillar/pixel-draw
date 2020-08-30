import React from 'react'
import { CellSize } from '../Model/size'
import InputLayer from './InputLayer'
import drawing from '../Model/drawing'
import renderer from './renderer'
import Grid from './Grid'

interface IProps {
    width: number
    height: number
}

const Canvas = (props: IProps) => {
    const ref = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        drawing.updateSize(props.height, props.width)
    }, [props.height, props.width])
    React.useEffect(() => {
        let frameRequested = false
        const onChange = () => {
            if (frameRequested) {
                return
            }
            frameRequested = true
            window.requestAnimationFrame(() => {
                frameRequested = false
                const ctx = ref.current?.getContext('2d')
                if (!ctx) {
                    return
                }
                renderer.prepare(ctx)
                renderer.render()
            })
        }
        return drawing.subscribe(onChange)
    }, [ref])
    return <div style={{ boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', position: 'relative', width: props.width * CellSize, height: props.height * CellSize }}>
        <Stacked>
            <Grid columns={props.width} rows={props.height} />
        </Stacked>
        <Stacked>
            <canvas ref={ref} id="drawing-canvas" width={props.width * CellSize} height={props.height * CellSize} />
        </Stacked>
        <Stacked>
            <InputLayer columns={props.width} rows={props.height} />
        </Stacked>
    </div>
}

const Stacked = ({ children }: { children: React.ReactNode }) => <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{children}</div>

export default Canvas