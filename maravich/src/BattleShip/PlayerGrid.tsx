import React from 'react'
import { BattleGrid } from './BattleGrid'
import { BattleshipPlayer } from './types'
import { TargetSelectionGrid } from './TargetSelectionGrid'

type PlayerGridProps = {
  self: BattleshipPlayer
}

export const PlayerGrid: React.FC<PlayerGridProps> = ({self}) => {
  if (self.active)
    return <TargetSelectionGrid player={self} />
  else
    return <BattleGrid player={self} />
}
