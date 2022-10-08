import styled from '@emotion/styled'
import { DarkMode, DataObject, DirectionsBoat, Home, LightMode, Login, VideogameAsset } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create, login } from '../Api/Router'

const PinnedSpeedDial = styled(SpeedDial)({
  position: 'absolute',
  right: '16px',
  top: '16px',
})

type HomeButtonProps = {
  dark: boolean,
  setDark: (dark: boolean) => void
}

export const HomeButton: React.FC<HomeButtonProps> = ({dark, setDark }) => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <PinnedSpeedDial ariaLabel='nav-bar' direction='down' icon={<SpeedDialIcon />}>
        <SpeedDialAction
          icon={<Home />}
          tooltipTitle={'Home'}
          onClick={() => navigate('/')}
        />
        <SpeedDialAction
          icon={<Login />}
          tooltipTitle={'Login'}
          onClick={() => setIsLoginOpen(true)}
        />
        <SpeedDialAction
          icon={<DirectionsBoat />}
          tooltipTitle={'Battleship'}
          onClick={() => navigate('/Battleship')}
        />
        <SpeedDialAction
          icon={<VideogameAsset />}
          tooltipTitle={'Match'}
          onClick={() => navigate('/Match')}
        />
        <SpeedDialAction
          icon={<DataObject />}
          tooltipTitle={'Json'}
          onClick={() => navigate('/Json')}
        />
        <SpeedDialAction
          icon={dark ? <DarkMode /> : <LightMode />}
          tooltipTitle={'Toggle Dark Mode'}
          onClick={() => setDark(!dark)}
        />
      </PinnedSpeedDial>
      <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            label='User'
            variant='standard'
            fullWidth
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            autoFocus
            label='Password'
            variant='standard'
            type='password'
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsLoginOpen(false)
            login(user, pass)
          }}>
            Log in
          </Button>
          <Button onClick={() => {
            setIsLoginOpen(false)
            create(user, pass)
          }}>
            Create Account
          </Button>
          <Button onClick={() => setIsLoginOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
    
}