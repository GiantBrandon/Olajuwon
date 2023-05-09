'use client'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#222d44',
      light: '#c48f7f',
      dark: '#97aab6',
    },
    secondary: {
      main: '#c48f7f',
      light: '#222d44',
      dark: '#c6a19b',
    },
    background: {
      default: '#eae9e5',
      paper: '#f4ddd5',
    },
    text: {
      primary: '#3d3d3d',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = createTheme(themeOptions)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
