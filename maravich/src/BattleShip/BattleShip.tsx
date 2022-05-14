import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { GameView } from './GameView'
import { MainMenu } from './MainMenu'
import { ShipSelection } from './ShipSelectionGrid'

export const socket = location.hostname === 'localhost'
  ? new WebSocket('ws://localhost:8080/ws') : 
  new WebSocket('wss://api.kyojin.dev:443/ws')


export const BattleShip: React.FC = () => {
  const [game, setGame] = useState<BattleshipGame>()

  useEffect(() => {
    socket.onmessage = (incoming) => {
      const game: BattleshipGame = JSON.parse(incoming.data)
      console.log(game)
      setGame(game)
    }
  }, [])

  console.log(game)
  if (!game)
    return <MainMenu />
  switch (game?.status) {
  case 'Active':
    return <GameView game={game}/>
  case 'Setup':
    return <ShipSelection game={game} />
  case 'End':
    return null
  }
}
