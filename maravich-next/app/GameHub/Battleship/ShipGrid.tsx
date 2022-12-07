import styled from '@emotion/styled'
import { Grid, Paper } from '@mui/material'
import React from 'react'
import { BattleCell } from './BattleCell'
import { BattleshipCellStatus } from './types'

export type Size = 'small' | 'medium' | 'large'

const GridWrapper = styled(Paper)((props: {size: number}) => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))

const GridView = styled(Grid)({
  height: '100%'
})

type ShipGridProps = {
  board: BattleshipCellStatus[]
  colors: any
  size?: Size
  hovered: number[]
  setHover: (index: number) => void
  onClick: (index: number) => void
}

const getSize = (size: Size) => {
  switch(size) {
  case 'large':
    return 360
  case 'medium':
    return 240
  case 'small':
    return 160
  }
}

export const ShipGrid: React.FC<ShipGridProps> = ({ board, colors, size = 'large', hovered, setHover, onClick }) => {
  return (
    <GridWrapper size={getSize(size)} onMouseLeave={() => setHover(-100)} elevation={2}>
      <GridView container columns={10}>
        {board?.map((item, index) => {
          const isTarget = false
          return (
            <BattleCell key={index} size={size} colors={colors} position={index / 10} status={isTarget ? 'Target' : item} hover={hovered.includes(index)} setHover={() => setHover(index)} onClick={() => onClick(index)} />
          )
        })}
      </GridView>
    </GridWrapper>
  )
}
