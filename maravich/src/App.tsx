import React, { Suspense, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
const Login = React.lazy(() => import('./Login/Login'))
const Fantasy = React.lazy(() => import('./Fantasy/Fantasy'))
const BattleShip = React.lazy(() => import('./BattleShip/BattleShip'))
const Match = React.lazy(() => import('./Match/Match'))
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { Homepage } from './Homepage/Homepage'
import { HomeButton } from './Homepage/HomeButton'

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
            <Route path='Login' element={
              <Suspense fallback='Loading...'>
                <Login />
              </Suspense>
            } />
            <Route path='Fantasy' element={
              <Suspense fallback='Loading...'>
                <Fantasy />
              </Suspense>
            } />
            <Route path='BattleShip' element={
              <Suspense fallback='Loading...'>
                <BattleShip />
              </Suspense>
            } />
            <Route path='Match' element={
              <Suspense fallback='Loading...'>
                <Match />
              </Suspense>
            } />
          </Route>
        </Routes>
        <HomeButton dark={dark} setDark={setDark} />
      </ThemeProvider>
    </HashRouter>
  )
}
