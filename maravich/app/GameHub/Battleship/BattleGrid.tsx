import styled from '@emotion/styled'
import { Avatar, Chip } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TargetSelectionContext } from './GameView'
import { ShipGrid } from './ShipGrid'
import { BattleshipPlayer } from './types'

export type Size = 'small' | 'medium' | 'large'

const NameChip = styled(Chip)((props: {width: number}) => ({
  maxWidth: `${props.width}px`
}))

type BattleGridProps = {
  player: BattleshipPlayer
  size?: Size
  hover?: number[]
  setHover?: (index: number) => void
  onClick?: (index: number) => void
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

export const BattleGrid: React.FC<BattleGridProps> = ({ player, size = 'large' }) => {
  const [hover, setHover] = useState<number>()
  const { active, targets, toggleTarget } = useContext(TargetSelectionContext)
  const myTargets = targets[player.name]
  const board = player.board.map((item, index) => myTargets?.find(target => target == index) != null ? 'Target' : item)

  const onClick = (index: number) => {
    if (active) {
      toggleTarget(player.name, index)
    }
  }

  return (
    <div>
      <ShipGrid board={board} colors={player.colors} size={size} hovered={hover != null ? [hover] : []} setHover={setHover} onClick={onClick} />
      <NameChip width={getSize(size)} avatar={<Avatar>{player.shipCount}</Avatar>} label={player.name} color={player.order == 0 ? 'primary' : 'default'} onDelete={player.cheater ? () => undefined : undefined} />
    </div>
  )
}
