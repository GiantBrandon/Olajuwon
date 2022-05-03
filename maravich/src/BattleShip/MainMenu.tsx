import { Button, Paper, Stack, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { socket } from './BattleShip'

export const MenuWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const MainMenu: React.FC = () => {
  const [name, setName] = useState('')

  const join = () => {
    socket.send(JSON.stringify({name: name, command: 'JOIN_ROOM'}))
  }

  return (
    <Stack height='100vh' justifyContent='center' alignItems='center'>
      <MenuWrapper>
        <TextField placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={join}>Join</Button>
      </MenuWrapper>
    </Stack>
  )
}
