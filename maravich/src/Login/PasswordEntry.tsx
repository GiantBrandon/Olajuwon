import styled from '@emotion/styled'
import React, { useContext, useState } from 'react'
import { colors, Theme } from '../Color'
import { spacing } from '../styles'
import { ThemeContext } from '../theme/themeContext'
import { PasswordEntryNode } from './PassWordEntryNode'

const NodeGrid = styled.div((props: {theme: Theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing.smaller,
    paddingLeft: spacing.smaller,
    border: `1px solid ${props.theme.contrast}`
}))

const NodeRow = styled.div({
    display: 'inline-flex'
})

type PasswordEntryProps = {

}

export const PasswordEntry: React.FC<PasswordEntryProps> = (props) => {
    const [selected, setSelected] = useState<number[]>([])
    const [drawing, setDrawing] = useState(false)
    const theme = useContext(ThemeContext).theme
    return (
        <NodeGrid theme={colors[theme]} onMouseDown={() => {setDrawing(true); setSelected([])}} onMouseUp={() => setDrawing(false)} onMouseLeave={() => setDrawing(false)}>
        {Array(4).fill(0).map((_, row) => 
        <NodeRow>
            {Array(4).fill(0).map((_, column) => <PasswordEntryNode drawing={drawing} isActive={selected.includes(row * 4 + column)} activate={() => setSelected([...selected, row * 4 + column])} /> )}
        </NodeRow>
        )}
        </NodeGrid>
    )
}