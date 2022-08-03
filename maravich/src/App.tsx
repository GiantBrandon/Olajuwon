import React, { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login/Login'
import { Fantasy } from './Fantasy/Fantasy'
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { BattleShip } from './BattleShip/BattleShip'
import { Homepage } from './Homepage/Homepage'
import { HomeButton } from './Homepage/HomeButton'
import { Match } from './Match/Match'

export const App: React.FC = () => {
  const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)
  console.log(dark)

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  })

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
            <Route path='Login' element={<Login />} />
            <Route path='Fantasy' element={<Fantasy />} />
            <Route path='BattleShip' element={<BattleShip />} />
            <Route path='Match' element={<Match />} />
          </Route>
        </Routes>
        <HomeButton dark={dark} setDark={setDark} />
      </ThemeProvider>
    </HashRouter>
  )
}
