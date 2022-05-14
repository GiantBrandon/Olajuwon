import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { EnemyPanel } from './EnemyPanel'
import { SelfPanel } from './SelfPanel'
import DistantShipHorn from '../distant-ship-horn.wav'

const TurnSound = new Audio(DistantShipHorn)

type Targets = {
  [key: string]: number[]
}

type TargetSelectionContextType = {
  active: boolean,
  targets: Targets,
  setTargets: (targets: Targets) => void
}
export const TargetSelectionContext = React.createContext<TargetSelectionContextType>({
  active: false,
  targets: {},
  setTargets: () => undefined
})


const ColumnWrapper = styled(Grid)({
  height: '100vh',
  padding: '12px'
})

type GameViewProps = {
  game: BattleshipGame
}

export const GameView: React.FC<GameViewProps> = ({game}) => {
  const [targets, setTargets] = useState<{[key: string]: number[]}>({})

  useEffect(() => {
    if (game.self.order == 0)
      TurnSound.play()
  }, [game.self])
  return (
    <TargetSelectionContext.Provider value={{active: game.self.order == 0, targets, setTargets}}>
      <ColumnWrapper container direction='row' spacing={1}>
        <SelfPanel self={game.self} messages={game.messages} />
        <EnemyPanel enemies={game.others} />
      </ColumnWrapper>
    </TargetSelectionContext.Provider>
  )
}
