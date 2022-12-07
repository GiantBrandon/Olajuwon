'use client'

import { createTheme, Paper, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HomeButton } from '../components/HomeButton'


export const MUIWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } })

  return <ThemeProvider theme={theme}>
    <Paper sx={{ height: '100vh', width: '100vw' }} square>
      {children}
      <HomeButton dark={dark} setDark={setDark} />
    </Paper>
  </ThemeProvider>
}