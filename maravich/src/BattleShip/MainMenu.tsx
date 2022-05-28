import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext, useState } from 'react'
import { SocketContext } from './BattleShip'

export const MenuWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const MainMenu: React.FC = () => {
  const [name, setName] = useState('')
  const { sendMessage } = useContext(SocketContext)

  return (
    <Dialog
      open={true}
    >
      <DialogTitle>{'Join Battleship Game'}</DialogTitle>
      <DialogContent>
        <TextField placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => sendMessage(name, 'JOIN_ROOM', {})}>Join</Button>
        <Button href='#/'>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
