import { LocalFireDepartment, RestartAlt, Settings } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, List, ListItem, ListItemText, Paper } from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext, useState } from 'react'
import { BattleGrid } from './BattleGrid'
import { socket } from './BattleShip'
import { TargetSelectionContext } from './GameView'
import { PreferencesEditor } from './PreferencesEditor'
import { BattleshipPlayer } from './types'

const ChatLog = styled(Paper)({
  width: '360px',
  height: '100%',
  overflow: 'auto'
})

  type SelfPanelProps = {
      self: BattleshipPlayer,
      messages: string[]
  }

export const SelfPanel: React.FC<SelfPanelProps> = ({self, messages}) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const { targets, setTargets, active } = useContext(TargetSelectionContext)

  const countTargets = () => {
    return Object.keys(targets).flatMap(target => targets[target]).length
  }

  return (
    <Grid item container xs='auto' direction='column' alignItems='center' spacing={1}>
      <Grid item xs='auto'>
        <BattleGrid player={self} size='large' />
      </Grid>
      <Grid item xs='auto'>
        <ButtonGroup variant='outlined'>
          <Button startIcon={<RestartAlt />} onClick={() => socket.send(JSON.stringify({command: 'RESET'}))} >
          Reset
          </Button>
          <Button startIcon={<Settings />} onClick={() => setIsPreferencesOpen(true)} >
          Preferences
          </Button>
          {active && <Button
            startIcon={<LocalFireDepartment />}
            disabled={(countTargets() == 0 && self.shipCount != 0) || (countTargets() > self.shipCount)}
            onClick={() => {
              socket.send(JSON.stringify({name: self.name, command: 'FIRE', targets: targets}))
              setTargets({})
            }}
          >
          Fire
          </Button>}
        </ButtonGroup>
      </Grid>
      <Grid item xs overflow='scroll'>
        <ChatLog>
          <List dense>
            {messages.map(message =>
              <ListItem>
                <ListItemText primary={message} />
              </ListItem>,
            )}
          </List>
        </ChatLog>
      </Grid>
      <PreferencesEditor open={isPreferencesOpen} handleClose={() => setIsPreferencesOpen(false)} />
    </Grid>
  )
}