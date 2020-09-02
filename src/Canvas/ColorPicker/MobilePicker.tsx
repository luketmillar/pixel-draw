import React from 'react'
import { useCurrentColor } from '.'
import Button from '../Components/Button'

const MobilePicker = () => {
    const indexRef = React.useRef(0)
    const currentColor = useCurrentColor()
    if (currentColor === undefined) {
        return <div />
    }
    const onSelect = (color: string) => {

    }
    return (
        <div style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Button style={{ width: 90, height: 90, backgroundColor: currentColor, display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }} onClick={() => onSelect(currentColor)} />
        </div>
    )
}

export default MobilePicker