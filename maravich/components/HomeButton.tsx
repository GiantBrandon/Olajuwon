'use client'

import styled from '@emotion/styled'
import { DarkMode, DataObject, Diamond, Home, LightMode, Login, VideogameAsset } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { create, login } from './Router'

const PinnedSpeedDial = styled(SpeedDial)({
  position: 'absolute',
  left: '16px',
  bottom: '16px',
})

const NextLink = styled(Link)({
  display: 'flex'
})

type HomeButtonProps = {
  dark: boolean,
  setDark: Dispatch<SetStateAction<boolean>>
}

export const HomeButton: React.FC<HomeButtonProps> = ({dark, setDark }) => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  
  return (
    <>
      <PinnedSpeedDial ariaLabel='nav-bar' direction='up' icon={<SpeedDialIcon color='primary' />}>
        <SpeedDialAction
          icon={<NextLink href='/' passHref aria-label='Home'><Home color='primary' /></NextLink>}
          tooltipTitle={'Home'}
        />
        <SpeedDialAction
          icon={<Login color='primary' />}
          tooltipTitle={'Login'}
          onClick={() => setIsLoginOpen(true)}
        />
        <SpeedDialAction
          icon={<NextLink href='/GameHub' passHref aria-label='Game Hub'><VideogameAsset color='primary' /></NextLink>}
          tooltipTitle={'Game Hub'}
        />
        <SpeedDialAction
          icon={<NextLink href='/Json' passHref aria-label='Json'><DataObject color='primary' /></NextLink>}
          tooltipTitle={'Json'}
        />
        <SpeedDialAction
          icon={dark ? <DarkMode color='primary' /> : <LightMode color='primary' />}
          tooltipTitle={'Toggle Dark Mode'}
          onClick={() => setDark(dark => !dark)}
        />
        <SpeedDialAction
          icon={<NextLink href='/Wedding' passHref aria-label='Wedding'><Diamond color='primary' /></NextLink>}
          tooltipTitle={'Toggle Dark Mode'}
          onClick={() => setDark(dark => !dark)}
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