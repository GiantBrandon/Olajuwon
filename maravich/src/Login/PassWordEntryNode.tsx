import { Radio } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { VisualModeContext } from '../theme/visualModeContext'

type NodeProps = {
    checked: boolean
}

type PasswordEntryNodeProps = {
    drawing: boolean
    isActive: boolean
    activate: () => void
}

export const PasswordEntryNode: React.FC<PasswordEntryNodeProps> = ({drawing, isActive, activate}) => {
    const [isHovered, setIsHovered] = useState(false)
    const mode = useContext(VisualModeContext).mode

    const handleActivate = () => {
        drawing && !isActive && activate()
    }
    
    useEffect(() => {
        isHovered && handleActivate()
    })

    return (
        <Radio checked={isActive} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
    )
}