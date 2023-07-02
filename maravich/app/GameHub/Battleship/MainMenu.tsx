import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { SocketContext } from './socket'

export const MenuWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const MainMenu: React.FC = () => {
  const [name, setName] = useState('')
  const [shipColor, setShipColor] = useState('success')
  const [untouchedColor, setUntouchedColor] = useState('primary')
  const [hitColor, setHitColor] = useState('disabled')
  const [missColor, setMissColor] = useState('inherit')
  const [targetColor, setTargetColor] = useState('inherit')
  const { sendMessage } = useContext(SocketContext)

  const colorItems = [
    <MenuItem key={'error'} value={'error'}>Red</MenuItem>,
    <MenuItem key={'success'} value={'success'}>Green</MenuItem>,
    <MenuItem key={'disabled'} value={'disabled'}>Black</MenuItem>,
    <MenuItem key={'primary'} value={'primary'}>Blue</MenuItem>,
    <MenuItem key={'inherit'} value={'inherit'}>Gray</MenuItem>,
  ]

  return (
    <Dialog
      open={true}
    >
      <DialogTitle>{'Join Battleship Game'}</DialogTitle>
      <DialogContent>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              placeholder='Enter Name'
              variant='standard'
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="ship-label">Ship Color</InputLabel>
              <Select
                id='ship-label'
                variant='standard'
                value={shipColor}
                onChange={(event: SelectChangeEvent) => setShipColor(event.target.value)}
              >
                {colorItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="untouched-label">Untouched Color</InputLabel>
              <Select
                id='untouched-label'
                variant='standard'
                value={untouchedColor}
                onChange={(event: SelectChangeEvent) => setUntouchedColor(event.target.value)}
              >
                {colorItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="hit-label">Hit Color</InputLabel>
              <Select
                id='hit-label'
                variant='standard'
                value={hitColor}
                onChange={(event: SelectChangeEvent) => setHitColor(event.target.value)}
              >
                {colorItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="miss-label">Miss Color</InputLabel>
              <Select
                id='miss-label'
                variant='standard'
                value={missColor}
                onChange={(event: SelectChangeEvent) => setMissColor(event.target.value)}
              >
                {colorItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="target-label">Target Color</InputLabel>
              <Select
                id='target-label'
                variant='standard'
                value={targetColor}
                onChange={(event: SelectChangeEvent) => setTargetColor(event.target.value)}
              >
                {colorItems}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
          
      </DialogContent>
      <DialogActions>
        <Button onClick={() => sendMessage(name, 'JOIN_ROOM', { colors: { 
          ship: shipColor,
          hit: hitColor,
          untouched: untouchedColor,
          miss: missColor,
          target: targetColor,
        }})}>
            Join
        </Button>
        <Link href='/GameHub' passHref>
          <Button>Cancel</Button>
        </Link>
      </DialogActions>
    </Dialog>
  )
}
