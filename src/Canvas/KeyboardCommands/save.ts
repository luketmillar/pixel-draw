import BaseCommand from './BaseCommand'
import drawing from '../Model/drawing'
import { CellSize } from '../Model/size'

class Save extends BaseCommand {
    public matches(e: KeyboardEvent) {
        return e.metaKey && !e.shiftKey && e.key === 's'
    }
    public do() {
        const { cells, rows, columns } = drawing.getCells()

        const canvas = document.createElement("canvas")
        canvas.width = columns * CellSize
        canvas.height = rows * CellSize
        const ctx = canvas.getContext("2d")
        if (ctx == null) {
            return
        }
        cells.forEach(({ row, column, color }) => {
            if (color === undefined) {
                return
            }
            ctx.fillStyle = color
            ctx.fillRect(column * CellSize, row * CellSize, CellSize, CellSize)
        })

        const link = document.createElement('a')
        // @ts-ignore
        link.style = 'display: none;'
        link.setAttribute('href', canvas.toDataURL("image/png"))
        link.setAttribute('download', 'pixel-draw.png')
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
            document.body.removeChild(link)
        }, 1000)
    }
}

export default new Save()