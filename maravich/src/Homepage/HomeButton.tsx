import styled from '@emotion/styled'
import { DarkMode, DirectionsBoat, Home, LightMode, Login, VideogameAsset } from '@mui/icons-material'
import { Drawer, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PinnedSpeedDial = styled(SpeedDial)({
  position: 'absolute',
  right: '16px',
  top: '16px',
})

const LoginField = styled(TextField)({
  margin: '8px',
})

type HomeButtonProps = {
  dark: boolean,
  setDark: (dark: boolean) => void
}

export const HomeButton: React.FC<HomeButtonProps> = ({dark, setDark }) => {
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
          icon={dark ? <DarkMode /> : <LightMode />}
          tooltipTitle={'Toggle Dark Mode'}
          onClick={() => setDark(!dark)}
        />
      </PinnedSpeedDial>
      <Drawer anchor={'left'}
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      >
        <LoginField label='Username' variant='standard' />
        <LoginField label='Password' variant='standard' type='password' />
      </Drawer>
    </>
  )
    
}