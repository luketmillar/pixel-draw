import drawing from "../Model/drawing"
import { CellSize } from "../Model/size"

class Renderer {
    private ctx: CanvasRenderingContext2D | undefined
    private cells: Array<{ cellKey: string, row: number, column: number, color: string | undefined }> = []
    private rows: number = 0
    private columns: number = 0

    public prepare(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        const { cells, rows, columns } = drawing.getCells()
        this.cells = cells
        this.rows = rows
        this.columns = columns
    }

    public render() {
        this.clear()
        this.cells.forEach(({ row, column, color }) => {
            if (color === undefined) {
                return
            }
            this.drawPixel(row, column, color)
        })
    }

    private clear() {
        this.ctx?.clearRect(0, 0, this.columns * CellSize, this.rows * CellSize)
    }

    private drawPixel(row: number, column: number, color: string | undefined) {
        if (this.ctx === undefined) {
            return
        }
        if (color === undefined) {
            return
        }
        this.ctx.fillStyle = color
        this.ctx.fillRect(column * CellSize, row * CellSize, CellSize, CellSize)
    }
}

export default new Renderer()