'use client'

import { useEffect, useState } from 'react'
import '../styles/globals.css'
import styled from '@emotion/styled'
import { Sidebar } from './Sidebar'
import { Paper, ThemeProvider, createTheme } from '@mui/material'
import { usePathname } from 'next/navigation'

const Layout = styled(Paper)((props: {mobile: boolean}) => ({
  display: 'grid',
  height: '100%',
  gridTemplate: props.mobile ? '"sidebar" min-content "content" 1fr / 1fr' : '"sidebar content" 1fr / min-content 1fr',
}))

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const pathname = usePathname()
  useEffect(() => {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        function (registration) {
          console.log('Service Worker registration successful with scope: ', registration.scope)
        },
        function (err) {
          console.log('Service Worker registration failed: ', err)
        }
      )
    }
  }, [])

  const theme = createTheme({ palette: { mode: dark ? 'dark' : 'light' } })

  return (
    <html lang='en' style={{ height: '100%' }}>
      <head>
        <title>{'Brandon Kurtz\'s Website'}</title>
      </head>
      <body style={{ height: '100%' }}>
        {pathname === '/Wedding' ? (
          children
        ) : (
          <ThemeProvider theme={theme}>
            <Layout square mobile={window.innerHeight > window.innerWidth}>
              <div style={{ gridArea: 'content' }}>
                {children}
              </div>
              <Sidebar dark={dark} setDark={setDark} />
            </Layout>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}
