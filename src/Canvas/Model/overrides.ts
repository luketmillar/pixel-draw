
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
        const overrideValues: Record<string, string | undefined> = {}
        Array.from(Object.keys(this.values)).forEach(cellKey => {
            const override = this.get(cellKey)
            if (override === undefined) {
                return
            }
            overrideValues[cellKey] = override.value
        })
        return overrideValues
    }
}