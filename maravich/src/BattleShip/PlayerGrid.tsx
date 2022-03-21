import React from 'react'
import { BattleGrid } from './BattleGrid'
import { BattleshipPlayer } from './types'
import { ShipSelectionGrid } from './ShipSelectionGrid'
import { TargetSelectionGrid } from './TargetSelectionGrid'

type PlayerGridProps = {
  self: BattleshipPlayer
}

export const PlayerGrid: React.FC<PlayerGridProps> = ({self}) => {
  if (self.board.length == 0)
    return <ShipSelectionGrid player={self} size={'large'} />
  else if (self.active)
    return <TargetSelectionGrid player={self} size={'large'} />
  else
    return <BattleGrid player={self} size={'large'} />
}
