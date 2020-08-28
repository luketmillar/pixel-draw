import { Cell } from "../Model/types"

type Subscription = () => void

export default abstract class Tool {
    public abstract onStart(cell: Cell): void
    public abstract onMove(cell: Cell): void
    public abstract onEnd(cell: Cell): void

    private _penColor: string = '#000'
    public get penColor() {
        return this._penColor
    }
    public set penColor(color: string) {
        this._penColor = color
        this.notify()
    }

    private subscriptions: Array<Subscription> = []
    public subscribe(s: Subscription) {
        this.subscriptions.push(s)
        return () => {
            this.subscriptions = this.subscriptions.filter(subscription => subscription !== s)
        }
    }

    public notify = () => {
        this.subscriptions.forEach(s => s())
    }
}