import styled from '@emotion/styled'
import React, { ReactNode, useContext, useState } from 'react'
import { colors, Theme } from '../Color'
import { spacing } from '../styles'
import { ThemeContext } from '../theme/themeContext'
import { PasswordEntryNode } from './PassWordEntryNode'

const Trace = styled.svg({
    position: 'absolute'
})

const NodeGrid = styled.div((props: {theme: Theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing.smaller,
    paddingLeft: spacing.smaller,
    border: `1px solid ${props.theme.contrast}`
}))

const NodeRow = styled.div({
    display: 'inline-flex',
    zIndex: 1
})

type PasswordEntryProps = {

}

type Coordinate = {
    x: number
    y: number
}

export const PasswordEntry: React.FC<PasswordEntryProps> = (props) => {
    const [selected, setSelected] = useState<Coordinate[]>([])
    const [drawing, setDrawing] = useState(false)
    const theme = useContext(ThemeContext).theme

    const renderLines = () => {
        const lines: ReactNode[] = []
        for ( let i = 0; i < selected.length - 1; i++) {
            lines.push(<line key={i} x1={selected[i].x * 38 + 13} y1={selected[i].y * 38 + 13} x2={selected[i + 1].x * 38 + 13} y2={selected[i + 1].y * 38 + 13} stroke={colors[theme].contrast} strokeWidth="2" />)
        }
        return (
            <Trace height="148" width="148">
            {lines}
          </Trace>
        )
    }

    return (
        <NodeGrid theme={colors[theme]} onMouseDown={() => {setDrawing(true); setSelected([])}} onMouseUp={() => setDrawing(false)} onMouseLeave={() => setDrawing(false)}>
        {renderLines()}
        {Array(4).fill(0).map((_, row) => 
        <NodeRow>
            {Array(4).fill(0).map((_, column) => <PasswordEntryNode drawing={drawing} isActive={selected.filter(coordinate => coordinate.x === column && coordinate.y === row).length > 0} activate={() => setSelected([...selected, {x: column, y: row}])} /> )}
        </NodeRow>
        )}
        </NodeGrid>
    )
}