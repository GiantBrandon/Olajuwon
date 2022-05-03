import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { BattleshipGame } from './types'
import { EnemyPanel } from './EnemyPanel'
import { SelfPanel } from './SelfPanel'

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
  height: '100vh'
})

type GameViewProps = {
  game: BattleshipGame
}

export const GameView: React.FC<GameViewProps> = ({game}) => {
  const [targets, setTargets] = useState<{[key: string]: number[]}>({})
  return (
    <TargetSelectionContext.Provider value={{active: game.self.active, targets, setTargets}}>
      <ColumnWrapper container>
        <SelfPanel self={game.self} messages={game.messages} />
        <EnemyPanel enemies={game.others} />
      </ColumnWrapper>
    </TargetSelectionContext.Provider>
  )
}
