import { Backspace, LocalFireDepartment, RestartAlt, Settings, Timer } from '@mui/icons-material'
import { Button, ButtonGroup, Chip, Grid, List, ListItem, ListItemText, Paper } from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
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
      messages: string[],
  }

export const SelfPanel: React.FC<SelfPanelProps> = ({self, messages}) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [timer, setTimer] = useState(0)
  const { targets, resetTargets, active } = useContext(TargetSelectionContext)

  const fire = (targets) => {
    socket.send(JSON.stringify({name: self.name, command: 'FIRE', targets: targets}))
    setTimer(-1)
    resetTargets()
  }

  useEffect(() => {
    if(self.order == 0)
      setTimer(30)
  }, [self])

  useEffect(() => {
    let interval
    if (self.order == 0) {
      if(timer == 0)
        fire({})
      interval = setInterval(() => {
        setTimer(time => time - 1)
      }, 1000)
    } else if (self.order > 0 && timer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [self, timer])

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
        </ButtonGroup>
      </Grid>
      {active && <Grid item xs='auto'>
        <ButtonGroup variant='outlined'>
          <Button
            startIcon={<LocalFireDepartment />}
            disabled={(countTargets() == 0 && self.shipCount != 0) || (countTargets() > self.shipCount)}
            onClick={() => fire(targets)}
          >
          Fire
          </Button>
          <Button
            startIcon={<Backspace />}
            disabled={countTargets() == 0}
            onClick={resetTargets}
          >
          Clear Targets
          </Button>
        </ButtonGroup>
      </Grid>}
      {self.order == 0 &&
        <Grid item xs='auto'>
          <Chip icon={<Timer />} label={timer} color={timer > 20 ? 'success' : timer > 10 ? 'warning' : 'error'} />
        </Grid>
      }
      <Grid item xs overflow='scroll'>
        <ChatLog>
          <List dense>
            {messages.map((message, index) =>
              <ListItem key={index}>
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