import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BattleshipGame, BattleshipPlayer } from './types'
import { BattleView } from './BattleView'

export const socket = new WebSocket('ws://localhost:8080/ws')

export const BattleShip: React.FC = (props) => {
  const [name, setName] = useState('')
  const [game, setGame] = useState<BattleshipGame>()
  console.log(game)

	useEffect(() => {
    socket.onmessage = (incoming) => {
      console.log(incoming.data)
      const game = JSON.parse(incoming.data)
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
