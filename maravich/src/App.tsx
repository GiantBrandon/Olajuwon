import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Expansion} from './Expansion';
import {Login} from './Login/Login';
import {Fantasy} from './Fantasy/Fantasy';
import {getFantasy} from './Api/Router';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {AppBar, Button, CssBaseline, IconButton} from '@material-ui/core';
import {Brush, Home} from '@material-ui/icons';
import background from './background.png';
import styled from '@emotion/styled';

const Background = styled.img({
  position: 'absolute',
  bottom: 0,
});

const ShellyLink = styled(Button)({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
});

export const App: React.FC = () => {
  const theme =
        createMuiTheme({
          palette: {
            type: 'dark',
          },
        });

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <a href='#/Home'><IconButton><Home fontSize='large'/></IconButton></a>
        </AppBar>
        <Route path='/Home'>
          <Background src={background} width={'100%'} height={'auto'} />
          <Expansion />
          <ShellyLink style={{fontSize: '24px'}} color={'primary'} size={'large'} startIcon={<Brush />} href={'https://tjdthwjd.carrd.co/'}>
            Visit Artist
          </ShellyLink>
        </Route>
        <Route exact path='/Github' component={() => {
          window.location.replace('https://github.com/GiantBrandon');
          return null;
        }}/>
        <Route exact path='/LinkedIn' component={() => {
          window.location.replace('https://www.linkedin.com/in/brandon-kurtz-377251111/');
          return null;
        }}/>
        <Route exact path='/Login'>
          <Login />
        </Route>
        <Route exact path='/Fantasy'>
          <div>Hello</div>
          <Fantasy />
        </Route>
        <Route exact path='/Ping' component={() => {
          getFantasy(75);
          return (<div>
            Check console for response
          </div>);
        }}/>
      </ThemeProvider>
    </HashRouter>
  );
};
