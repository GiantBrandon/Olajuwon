import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import { colors, Theme } from '../Color'
import { spacing } from '../styles'
import { ThemeContext } from '../theme/themeContext'

type NodeProps = {
    checked: boolean
    theme: Theme
}

const Node = styled.div((props: NodeProps) => ({
    width: spacing.medium,
    height: spacing.medium,
    marginBottom: spacing.smaller,
    marginRight: spacing.smaller,
    borderRadius: spacing.medium,
    backgroundColor: props.checked ? props.theme.contrast : props.theme.parallel,
    border: `1px solid ${props.theme.contrast}`
}))

type PasswordEntryNodeProps = {
    drawing: boolean
    isActive: boolean
    activate: () => void
}

export const PasswordEntryNode: React.FC<PasswordEntryNodeProps> = ({drawing, isActive, activate}) => {
    const [isHovered, setIsHovered] = useState(false)
    const theme = useContext(ThemeContext).theme

    const handleActivate = () => {
        drawing && !isActive && activate()
    }
    
    useEffect(() => {
        isHovered && handleActivate()
    })

    return (
        <Node checked={isActive} theme={colors[theme]} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
    )
}