import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Expansion} from './Expansion';
import {Link} from 'react-router-dom';
import {Login} from './Login/Login';
import {getFantasy, getLinkedin, getUsers} from './Api/Router';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {VisualModeContext} from './theme/visualModeContext';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Link to='/Home'>Return Home</Link>
        <Switch>
          <Route path='/Home'>
            <Expansion />
          </Route>
          <Route path='/Github' component={() => {
            window.location.replace('https://github.com/GiantBrandon');
            return null;
          }}/>
          <Route path='/LinkedIn' component={() => {
            window.location.replace('https://www.linkedin.com/in/brandon-kurtz-377251111/');
            return null;
          }}/>
          <Route path='/Login'>
            <Login />
          </Route>
          <Route path='/Ping' component={() => {
            getFantasy();
            return (<div>
            Check console for response
            </div>);
          }}/>
          <Route path='/test'>
                TEST
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};
