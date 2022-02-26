import styled from "@emotion/styled"
import { Button, Grid, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { BattleGrid } from "./BattleGrid"
import { getBoard, getUrl } from "../Api/Router"

const ColumnWrapper = styled(Grid)({
  height: '100vh'
})

const Column = styled(Stack)({
  height: '100%'
})

const socket = new WebSocket('ws://localhost:8080/ws')

export const BattleShip: React.FC = (props) => {
  const [boards, setBoards] = useState<boolean[][]>([])

  const [message, setMessage] = useState("init")
	useEffect(() => {
    socket.onopen = () => {
      setMessage("connected")
    }
    socket.onmessage = (incoming) => {
      console.log(incoming)
      console.log(JSON.parse(incoming.data))
      //setBoards(JSON.parse(incoming.data))
    }
	}, [])

  const getBoard = () => {
    socket.send("GET_BOARD")
  }

  return (
    <ColumnWrapper container>
      <div>{message}</div>
      <Grid item xs={3}>
        <Column spacing={2} alignItems='center' justifyContent='space-evenly'>
          {boards.map(board => (
            <BattleGrid board={board} />
          ))}
        </Column>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={getBoard}>Generate Board</Button>
      </Grid>
    </ColumnWrapper>
  )
}
