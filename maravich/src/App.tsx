import React, {useContext} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Expansion} from './Expansion';
import {Login} from './Login/Login';
import {Fantasy} from './Fantasy/Fantasy';
import {getFantasy} from './Api/Router';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {AppBar, CssBaseline, IconButton} from '@material-ui/core';
import {VisualModeContext} from './theme/visualModeContext';
import {Home} from '@material-ui/icons';

export const App: React.FC = () => {
  const modeContext = useContext(VisualModeContext);
  const theme = React.useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: modeContext.mode,
          },
        }),
      [modeContext],
  );

  return (
    <HashRouter basename='\'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <a href='#/Home'><IconButton><Home fontSize='large'/></IconButton></a>
        </AppBar>
        <Route path='/Home'>
          <Expansion />
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
