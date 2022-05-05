import styled from '@emotion/styled'
import { Avatar, Chip, Grid, Paper } from '@mui/material'
import React, { useContext, useState } from 'react'
import { BattleCell } from './BattleCell'
import { TargetSelectionContext } from './GameView'
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
  const { active, targets, setTargets } = useContext(TargetSelectionContext)
  const myTargets = targets[player.name]

  const onClick = (index: number) => {
    if (active) {
      if (!targets[player.name])
        setTargets({...targets, [player.name]: [index]})
      else if (!targets[player.name].find(target => target == index))
        setTargets({...targets, [player.name]: [...myTargets, index]})
      else {
        myTargets.splice(myTargets.indexOf(index), 1)
        setTargets({...targets, [player.name]: [...myTargets]})
      }
    }
  }

  return (
    <div>
      <GridWrapper size={getSize(size)} onMouseLeave={() => setHover(undefined)}>
        <GridView container columns={10}>
          {player.board?.map((item, index) => {
            const isTarget = myTargets?.find(target => target == index)
            return (
              <BattleCell key={index} size={size} status={isTarget ? 'Target' : item} hover={active && hover == index} setHover={() => setHover(index)} onClick={() => onClick(index)} />
            )
          })}
        </GridView>
      </GridWrapper>
      <Chip avatar={<Avatar>{player.shipCount}</Avatar>} label={player.name} />
    </div>
  )
}
