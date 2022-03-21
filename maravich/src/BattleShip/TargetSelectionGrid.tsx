import styled from '@emotion/styled'
import { Button, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { BattleCell } from './BattleCell'
import { Size } from './BattleGrid'
import { socket } from './BattleShip'
import { BattleshipPlayer } from './types'

const GridWrapper = styled(Paper)({
	width: '480px',
	height: '480px'
})

const GridView = styled(Grid)({
  height: '100%'
})

type TargetSelectionGridProps = {
  player: BattleshipPlayer
  size: Size
}

export const TargetSelectionGrid: React.FC<TargetSelectionGridProps> = ({ player, size }) => {
  const [hover, setHover] = useState<number>(-10)
  const [selected, setSelected] = useState<number>(-10)

  const fire = () => {
    console.log(JSON.stringify({name: player.name, command: 'FIRE', targets: [selected]}))
    socket.send(JSON.stringify({name: player.name, command: 'FIRE', targets: [selected]}))
  }

  return (
    <>
    <GridWrapper onMouseLeave={() => setHover(-10)}>
      <GridView container columns={10}>
        {player.board.map((item, index) => <BattleCell key={index} size={size} status={selected == index ? 'Target' : item} hover={index == hover} setHover={() => setHover(index)} onClick={() => setSelected(index)} />)}
      </GridView>
    </GridWrapper>
    <Button onClick={fire}>
      Fire
    </Button>
    </>
  )
}
