import { useState } from "react"
import { ThemeContext } from "./theme/themeContext"
import React from 'react'
import { colors } from "./Color"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Expansion } from "./Expansion"
import { Link } from 'react-router-dom'
import { Login } from "./Login/Login"

export const App: React.FC = () => {
    const [theme, setTheme] = useState('dark')

    return (
        <BrowserRouter>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className='application'> 
            <Helmet>
                <style>{`body { background-color: ${colors[theme].BG};}`}</style>
            </Helmet>
            </div>
            <Link to='/Home'>Return Home</Link>
        <Switch>
            <Route path='/Home'>
            <Expansion />
            </Route>
        <Route path='/Github' component={() => {
            window.location.replace('https://github.com/GiantBrandon')
            return null;
        }}/>
        <Route path='/LinkedIn' component={() => {
            window.location.replace('https://www.linkedin.com/in/brandon-kurtz-377251111/');
            return null;
        }}/>
            <Route path='/Login'>
                <Login />
            </Route>
            <Route path='/test'>
                TEST
            </Route>
        </Switch>
        </ThemeContext.Provider>
        </BrowserRouter>
    )
}