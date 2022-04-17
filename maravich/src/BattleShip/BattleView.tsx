import styled from '@emotion/styled'
import { Grid, IconButton, List, ListItem, Paper, Stack } from '@mui/material'
import React, { useState } from 'react'
import { BattleGrid } from './BattleGrid'
import { BattleshipGame } from './types'
import { PlayerGrid } from './PlayerGrid'
import { Delete, Settings } from '@mui/icons-material'
import { RulesEditor } from './RulesEditor'
import { socket } from './BattleShip'

const ColumnWrapper = styled(Grid)({
  height: '100vh'
})

const Column = styled(Stack)({
  height: '100%'
})

const ChatLog = styled(Paper)({
  width: '100%'
})

type BattleViewProps = {
  game: BattleshipGame
}

export const BattleView: React.FC<BattleViewProps> = ({game}) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false)

  return (
    <ColumnWrapper container>
      <Grid item xs={3}>
        <Column spacing={2} alignItems='center' justifyContent='space-evenly'>
          {game.others.map((player, index) => index % 2 == 0 && (
            <BattleGrid key={index} player={player} />
          ))}
        </Column>
      </Grid>
      <Grid item xs={6}>
        <Column spacing={2} alignItems='center'>
          <PlayerGrid game={game} />
          <IconButton onClick={() => setIsRulesOpen(true)} >
            <Settings />
          </IconButton>
          <IconButton onClick={() => socket.send(JSON.stringify({command: 'RESET'}))} >
            <Delete />
          </IconButton>
          <RulesEditor open={isRulesOpen} handleClose={() => setIsRulesOpen(false)} rules={game.rules} />
          <ChatLog>
            <List>
              {game.messages.map(message => {
                return (
                  <ListItem>
                    {message}
                  </ListItem>
                )
              })}
            </List>
          </ChatLog>
        </Column>
      </Grid>
      <Grid item xs={3}>
        <Column spacing={2} alignItems='center' justifyContent='space-evenly'>
          {game.others.map((player, index) => index % 2 == 1 && (
            <BattleGrid key={index} player={player} />
          ))}
        </Column>
      </Grid>
    </ColumnWrapper>
  )
}
