import React from 'react'

interface IOptions {
    delay?: number | undefined
}

export default function useHover<T extends Element = any>(): [boolean, React.RefObject<T>] {
    const delayTimerRef = React.useRef<number | undefined>(undefined)
    const ref = React.useRef<T>(null)
    const [value, setValue] = React.useState(false)
    const clearDelayTimer = () => {
        if (delayTimerRef.current !== undefined) {
            window.clearTimeout(delayTimerRef.current)
        }
    }

    React.useEffect(() => {
        const handleMouseOver = () => {
            setValue(true)
        }
        const handleMouseOut = () => {
            clearDelayTimer()
            setValue(false)
        }
        const node = ref!.current
        if (node) {
            node.addEventListener('mouseover', handleMouseOver)
            node.addEventListener('mouseleave', handleMouseOut)

            return () => {
                clearDelayTimer()
                node.removeEventListener('mouseover', handleMouseOver)
                node.removeEventListener('mouseleave', handleMouseOut)
            }
        }
    }, [ref])

    return [value, ref]
}
