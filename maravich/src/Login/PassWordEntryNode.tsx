import styled from '@emotion/styled'
import { Radio } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { spacing } from '../styles'
import { VisualModeContext } from '../theme/visualModeContext'

type NodeProps = {
    checked: boolean
}

const Node = styled.div((props: NodeProps) => ({
    width: spacing.medium,
    height: spacing.medium,
    marginBottom: spacing.smaller,
    marginRight: spacing.smaller,
    borderRadius: spacing.medium,
    backgroundColor: props.checked ? '#FFFFFF' : '#000000',
    border: `1px solid #FFFFF`
}))

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