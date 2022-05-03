import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { GameView } from './GameView'
import { MainMenu } from './MainMenu'
import { ShipSelection } from './ShipSelectionGrid'

export const socket = location.hostname === 'localhost'
  ? new WebSocket('ws://localhost:8080/ws') : 
  new WebSocket('ws://api.kyojin.dev:443/ws')


export const BattleShip: React.FC = () => {
  const [game, setGame] = useState<BattleshipGame>()

  useEffect(() => {
    socket.onmessage = (incoming) => {
      const game = JSON.parse(incoming.data)
      console.log(game)
      setGame(game)
    }
  }, [])

  if (!game?.self) {
    return <MainMenu />
  } else if (game.self.board.length == 0) {
    return <ShipSelection game={game} />
  } else {
    return <GameView game={game}/>
  }
}
