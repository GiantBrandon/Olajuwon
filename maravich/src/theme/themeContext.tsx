import React, { Dispatch, SetStateAction } from 'react'

type ThemeContextModel = {
    theme: string,
    setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = React.createContext<ThemeContextModel>({theme: 'dark', setTheme: () => {}});

