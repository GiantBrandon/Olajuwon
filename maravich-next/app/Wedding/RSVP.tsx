'use client'

import { Rsvp } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

export const RSVP: React.FC = () => {
  
  return (
    <Stack direction='column' alignItems='center' gap={2}>
      <Typography variant='h3'>
      Sign-up through google sheets
      </Typography>
      <Button size='large' variant='contained' endIcon={<Rsvp />}>
        Open
      </Button>
    </Stack>
  )
}
