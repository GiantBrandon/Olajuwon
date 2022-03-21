import styled from '@emotion/styled'
import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { BattleCell } from './BattleCell'
import { BattleshipPlayer } from './types'

export type Size = 'small' | 'medium' | 'large'

const GridWrapper = styled(Paper)((props: {size: number}) => ({
	width: `${props.size}px`,
	height: `${props.size}px`
}))

const GridView = styled(Grid)({
  height: '100%'
})

type BattleGridProps = {
  player: BattleshipPlayer
  size?: Size
}

const getSize = (size: Size) => {
  switch(size) {
    case 'large':
      return 480
    case 'medium':
      return 360
    case 'small':
      return 240
  }
}

export const BattleGrid: React.FC<BattleGridProps> = ({ player, size = 'medium' }) => {
  const [hover, setHover] = useState<number>(-10)
  return (
    <GridWrapper size={getSize(size)} onMouseLeave={() => setHover(-10)}>
      <GridView container columns={10}>
        {player.board?.map((item, index) => {
          return (
            <BattleCell key={index} size={size} status={item} hover={index >= hover && index < hover + 4} setHover={() => setHover(index)}/>
          )
        })}
      </GridView>
      <div>{player.name}{player.defeat ? ' defeated' : undefined}</div>
    </GridWrapper>
  )
}
