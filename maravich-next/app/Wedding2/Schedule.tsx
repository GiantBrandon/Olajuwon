'use client'

import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export const Schedule: React.FC = () => {
  
  return (
    <Stack direction='column' alignItems='center' gap={2}>
      <Skeleton variant='rectangular' animation='wave'>Work In Progress</Skeleton>
    </Stack>
  )
}
