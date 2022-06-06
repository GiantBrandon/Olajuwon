import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { GameView } from './GameView'
import { MainMenu } from './MainMenu'
import { ShipSelection } from './ShipSelectionGrid'

type SocketContextType = {
  sendMessage: (
    name: string,
    command: string,
    props: Record<string, unknown>
  ) => void
}
  
export const SocketContext = React.createContext<SocketContextType>({sendMessage: () => undefined})


export const BattleShip: React.FC = () => {
  const [game, setGame] = useState<BattleshipGame>()
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const mySocket = location.hostname === 'localhost'
      ? new WebSocket('ws://localhost:8080/ws') : 
      new WebSocket('wss://api.kyojin.dev:443/ws')
    mySocket.onmessage = (incoming) => {
      const game: BattleshipGame = JSON.parse(incoming.data)
      setGame(game)
    }
    setSocket(mySocket)
  }, [])

  const sendMessage = (name: string, command: string, props: Record<string, unknown>) => {
    socket?.send(JSON.stringify({name, command, ...props}))
  }

  if (!game || !('status' in game))
    return <SocketContext.Provider value={{sendMessage}}><MainMenu /></SocketContext.Provider>
  switch (game?.status) {
  case 'Active':
    return <SocketContext.Provider value={{sendMessage}}><GameView game={game}/></SocketContext.Provider>
  case 'Setup':
    return <SocketContext.Provider value={{sendMessage}}><ShipSelection game={game} /></SocketContext.Provider>
  case 'End':
    return null
  }
}
