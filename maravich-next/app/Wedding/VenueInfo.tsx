'use client'

import { Button, Link, Skeleton, Stack } from '@mui/material'
import React from 'react'

export const VenueInfo: React.FC = () => {
  
  return (
    <Stack direction='column' alignItems='center' gap={2}>
      <Skeleton variant='rectangular' animation='wave'>Work In Progress</Skeleton>
      <Button size='large' variant='contained' endIcon={<Link />} href='https://hiddenbrookeweddings.com/'>View Website</Button>
    </Stack>
  )
}
