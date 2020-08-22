export const minMax = (a: number, b: number): [number, number] => {
    const min = Math.min(a, b)
    const max = Math.max(a, b)
    return [min, max]
}