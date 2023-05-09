'use client'

import { Search } from '@mui/icons-material'
import { Card, CardContent, Divider, FilledInput, FormControl, Input, InputAdornment, InputLabel, List, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SeatingChart } from './SeatingChart'
import { RSVP } from './RSVP'
import { WeddingParty } from './WeddingParty'
import { Home } from './Home'
import { VenueInfo } from './VenueInfo'
import { Schedule } from './Schedule'

const tables = [
  ['Alison Reikher', 'Brandon Kurtz', 'Jason Kurtz', 'Jen Kurtz'],
  ['Marianna Reikher', 'Alex Reikher', 'Daniel Reikher', 'Kristine Kurtz', 'Kelly Kurtz'],
  ['Stephanie', 'Alexis', 'Sara'],
  ['Stephanie', 'Alexis', 'Sara']
]

const Wedding: React.FC = () => {
  const [tab, setTab] = useState(0)
  
  return (
    <>
      <Tabs
        value={tab}
        onChange={(e: React.SyntheticEvent, newTab: number) => setTab(newTab)}
        variant="scrollable"
        centered
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
