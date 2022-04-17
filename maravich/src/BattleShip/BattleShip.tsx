import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BattleshipGame } from './types'
import { BattleView } from './BattleView'

export const socket = location.hostname === 'localhost'
    ? new WebSocket('ws://localhost:8080/ws') : 
    new WebSocket('ws://api.kyojin.dev:443/ws')


export const BattleShip: React.FC = () => {
  const [name, setName] = useState('')
  const [game, setGame] = useState<BattleshipGame>()
  console.log(game)

	useEffect(() => {
    socket.onmessage = (incoming) => {
      const game = JSON.parse(incoming.data)
      console.log(game)
      setGame(game)
    }
	}, [])

  const getBoard = () => {
    socket.send(JSON.stringify({name: name, command: 'JOIN_ROOM'}))
  }

  return game?.self ? (
    <BattleView game={game} />
  ) : (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={getBoard}>Join</Button>
    </>
  )
}
