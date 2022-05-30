import React, { useState } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import { Expansion } from './Expansion'
import { Login } from './Login/Login'
import { Fantasy } from './Fantasy/Fantasy'
import background from './background.png'
import styled from '@emotion/styled'
import {
  Button,
  createTheme,
  CssBaseline,
  Fab,
  ThemeProvider,
} from '@mui/material'
import { Home, Brush } from '@mui/icons-material'
import { BattleShip } from './BattleShip/BattleShip'

const Background = styled.img({
  position: 'absolute',
  bottom: 0,
  right: 0,
})

const HomeButton = styled(Fab)({
  position: 'absolute',
  right: '16px',
  top: '16px',
})

const ShellyLink = styled(Button)({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
})

export const App: React.FC = () => {
  const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  })

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route exact path='/'>
          {window.innerHeight / window.innerWidth < .65 ? <Background src={background} width={'100%'} height={'auto'} /> : <Background src={background} width={'auto'} height={'100%'} />}
          <Expansion toggleDarkMode={() => setDark(dark => !dark)} />
          <ShellyLink
            style={{ fontSize: '24px' }}
            color={'primary'}
            size={'large'}
            startIcon={<Brush />}
            href={'https://tjdthwjd.carrd.co/'}
          >
            Visit Artist
          </ShellyLink>
        </Route>
        <Route
          exact
          path='/Github'
          component={() => {
            window.location.replace('https://github.com/GiantBrandon')
            return null
          }}
        />
        <Route
          exact
          path='/LinkedIn'
          component={() => {
            window.location.replace(
              'https://www.linkedin.com/in/brandon-kurtz-377251111/'
            )
            return null
          }}
        />
        <Route exact path='/Login'>
          <Login />
        </Route>
        <Route exact path='/Fantasy'>
          <div>Hello</div>
          <Fantasy />
        </Route>
        <Route exact path='/BattleShip'>
          <BattleShip />
        </Route>
        <Link to='#/'>
          <HomeButton color='primary'>
            <Home fontSize='large' />
          </HomeButton>
        </Link>
      </ThemeProvider>
    </HashRouter>
  )
}
