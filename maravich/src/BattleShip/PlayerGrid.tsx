import React from 'react'
import { BattleGrid } from './BattleGrid'
import { BattleshipGame } from './types'
import { ShipSelectionGrid } from './ShipSelectionGrid'
import { TargetSelectionGrid } from './TargetSelectionGrid'

type PlayerGridProps = {
  game: BattleshipGame
}

export const PlayerGrid: React.FC<PlayerGridProps> = ({game}) => {
  if (game.self.board.length == 0)
    return <ShipSelectionGrid game={game} />
  else if (game.self.active)
    return <TargetSelectionGrid player={game.self} size={'large'} />
  else
    return <BattleGrid player={game.self} size={'large'} />
}
