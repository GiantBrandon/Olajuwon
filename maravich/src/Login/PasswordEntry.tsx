import styled from '@emotion/styled'
import React, { ReactNode, useContext, useState } from 'react'
import { spacing } from '../styles'
import { VisualModeContext } from '../theme/visualModeContext'
import { PasswordEntryNode } from './PassWordEntryNode'

const Trace = styled.svg({
    position: 'absolute'
})

const NodeGrid = styled.div(() => ({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing.smaller,
    paddingLeft: spacing.smaller,
    border: `1px solid #FFFFFF`
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
    const mode = useContext(VisualModeContext).mode

    const renderLines = () => {
        const lines: ReactNode[] = []
        for ( let i = 0; i < selected.length - 1; i++) {
            lines.push(<line key={i} x1={selected[i].x * 42 + 21} y1={selected[i].y * 42 + 21} x2={selected[i + 1].x * 42 + 21} y2={selected[i + 1].y * 42 + 21} stroke='#FFFFFF' strokeWidth="2" />)
        }
        return (
            <Trace height="148" width="148">
            {lines}
          </Trace>
        )
    }

    return (
        <NodeGrid onMouseDown={() => {setDrawing(true); setSelected([])}} onMouseUp={() => setDrawing(false)} onMouseLeave={() => setDrawing(false)}>
        {renderLines()}
        {Array(4).fill(0).map((_, row) => 
        <NodeRow>
            {Array(4).fill(0).map((_, column) => <PasswordEntryNode drawing={drawing} isActive={selected.filter(coordinate => coordinate.x === column && coordinate.y === row).length > 0} activate={() => setSelected([...selected, {x: column, y: row}])} /> )}
        </NodeRow>
        )}
        </NodeGrid>
    )
}