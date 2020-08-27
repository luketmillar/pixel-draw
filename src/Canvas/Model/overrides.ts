
export default class Overrides {
    private values: Record<string, { value: string | undefined }> = {}

    public set = (cellKey: string, value: string | undefined) => {
        this.values[cellKey] = { value }
    }

    public get = (cellKey: string) => {
        return this.values[cellKey]
    }

    public remove = (cellKey: string) => {
        delete this.values[cellKey]
    }

    public clearAll = () => {
        this.values = {}
    }

    public getValues = () => {
        return Array.from(Object.keys(this.values)).map(cellKey => {
            const override = this.get(cellKey)
            if (override === undefined) {
                return undefined
            }
            return { cellKey, value: override.value }
        }).filter(o => o !== undefined) as Array<{ cellKey: string, value: string | undefined }>
    }
}