'use client'

import { Stack, Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { SeatingChart } from './SeatingChart'
import { RSVP } from './RSVP'
import { WeddingParty } from './WeddingParty'
import { Home } from './Home'
import { VenueInfo } from './VenueInfo'
import { Schedule } from './Schedule'

const Wedding: React.FC = () => {
  const [tab, setTab] = useState(0)
  const theme = createTheme({
    typography: {
      fontFamily: ['Great Vibes', 'cursive'].join(','),
    },
  })
  
  return (
    <>
      <Stack direction='column' alignItems='center'>
        <ThemeProvider theme={theme}>
          <Typography variant='h2'>Brandon</Typography>
          <Typography variant='h5'>and</Typography>
          <Typography variant='h2'>Alison</Typography>
        </ThemeProvider>
      </Stack>
      <Tabs
        value={tab}
        onChange={(e: React.SyntheticEvent, newTab: number) => setTab(newTab)}
        variant="scrollable"
      >
        <Tab label='Home' />
        <Tab label='RSVP' />
        <Tab label='Seating Chart' />
        <Tab label='Wedding Party' />
        <Tab label='Venue Info' />
        <Tab label='Schedule' />
      </Tabs>
      {tab === 0 && <Home />}
      {tab === 1 && <RSVP />}
      {tab === 2 && <SeatingChart />}
      {tab === 3 && <WeddingParty />}
      {tab === 4 && <VenueInfo />}
      {tab === 5 && <Schedule />}
    </>
  )
}

export default Wedding
