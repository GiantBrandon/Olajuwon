import { Delete, LocalFireDepartment } from '@mui/icons-material'
import { Grid, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext } from 'react'
import { BattleGrid } from './BattleGrid'
import { socket } from './BattleShip'
import { TargetSelectionContext } from './GameView'
import { BattleshipPlayer } from './types'

const ChatLog = styled(Paper)({
  width: '100%'
})

  type SelfPanelProps = {
      self: BattleshipPlayer,
      messages: string[]
  }

export const SelfPanel: React.FC<SelfPanelProps> = ({self, messages}) => {
  const { targets, setTargets, active } = useContext(TargetSelectionContext)
  console.log(targets)

  const countTargets = () => {
    return Object.keys(targets).flatMap(target => targets[target]).length
  }

  return (
    <Grid container direction='column' xs='auto' alignItems='center' paddingRight='12px'>
      <BattleGrid player={self} size='large' />
      <IconButton onClick={() => socket.send(JSON.stringify({command: 'RESET'}))} >
        <Delete />
      </IconButton>
      {active && <IconButton disabled={(countTargets() == 0) || (countTargets() > self.shipCount)} onClick={() => {
        socket.send(JSON.stringify({name: self.name, command: 'FIRE', targets: targets}))
        setTargets({})
      }} >
        <LocalFireDepartment />
      </IconButton>}
      <ChatLog>
        <List dense>
          {messages.slice(-4).map(message =>
            <ListItem>
              <ListItemText primary={message}/>
            </ListItem>,
          )}
        </List>
      </ChatLog>
    </Grid>
  )
}