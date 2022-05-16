import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { EnemyPanel } from './EnemyPanel'
import { SelfPanel } from './SelfPanel'
import DistantShipHorn from '../distant-ship-horn.wav'
import GunCock from '../gun-cock.wav'

const ShipHornSound = new Audio(DistantShipHorn)
const GunCockSound = new Audio(GunCock)

type Targets = {
  [key: string]: number[]
}

type TargetSelectionContextType = {
  active: boolean,
  targets: Targets,
  resetTargets: () => void,
  toggleTarget: (player: string, point: number) => void
}
export const TargetSelectionContext = React.createContext<TargetSelectionContextType>({
  active: false,
  targets: {},
  resetTargets: () => undefined,
  toggleTarget: () => undefined
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

  const toggleTarget = (player: string, point: number) => {
    const playerTargets = targets[player]
    if (!targets[player])
      setTargets({...targets, [player]: [point]})
    else if (targets[player].find(target => target == point) == null) 
      setTargets({...targets, [player]: [...playerTargets, point]})
    else {
      playerTargets.splice(playerTargets.indexOf(point), 1)
      setTargets({...targets, [player]: [...playerTargets]})
    }
  }

  useEffect(() => {
    if (game.self.order == 0){
      switch(localStorage.getItem('alert')){
      case 'none':
        break
      case 'horn':
        ShipHornSound.play()
        break
      case 'gun':
        GunCockSound.play()
        break
      default:
        ShipHornSound.play()
        break
      }
    }
  }, [game.self])

  return (
    <TargetSelectionContext.Provider value={{active: game.self.order == 0, targets, resetTargets: () => setTargets({}), toggleTarget}}>
      <ColumnWrapper container direction='row' spacing={1}>
        <SelfPanel self={game.self} messages={game.messages} />
        <EnemyPanel enemies={game.others} />
      </ColumnWrapper>
    </TargetSelectionContext.Provider>
  )
}
