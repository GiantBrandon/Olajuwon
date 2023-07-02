'use client'

import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Paper, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { DarkMode, DataObject, Home, LightMode, Login, VideogameAsset } from '@mui/icons-material'

const Layout = styled(Paper)((props: {mobile: boolean}) => ({
  display: 'grid',
  height: '100%',
  gridTemplate: props.mobile ? '"sidebar" min-content "content" 1fr / 1fr' : '"sidebar content" 1fr / min-content 1fr',
}))

const tabMap: Record<string, number> = {
  '/': 0,
  '/Login': 1,
  '/GameHub': 2,
  '/Json': 3,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, setDark] = useState(true)
  const [mobile, setMobile] = useState(true)
  const pathname = usePathname()
  const tab = tabMap[pathname]
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    setMobile(window.innerHeight > window.innerWidth)
  }, [])

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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#646464" />
        <meta name="description" content="Website for Brandon Kurtz" />
        <link rel="shortcut icon" href="/drawing.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/drawing.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ height: '100%', margin: 0 }}>
        {pathname === '/Wedding' ? (
          children
        ) : (
          <ThemeProvider theme={theme}>
            <Layout square mobile={mobile}>
              <div style={{ gridArea: 'content' }}>
                {children}
              </div>
              <Tabs
                value={tab}
                variant='scrollable'
                orientation={mobile ? 'horizontal' : 'vertical'}
                sx={{ zIndex: 1, width: mobile ? undefined : '200px', bgcolor: 'background.paper' }}
              >
                <Tab icon={<Home />} iconPosition='start' label='Home' onClick={() => router.push('/')} />
                <Tab icon={<Login />} iconPosition='start' label='Login' onClick={() => router.push('/Login')} />
                <Tab icon={<VideogameAsset />} iconPosition='start' label='Game Hub' onClick={() => router.push('/GameHub')} />
                <Tab icon={<DataObject />} iconPosition='start' label='Json' onClick={() => router.push('/Json')} />
                <Tab
                  icon={dark ? <LightMode /> : <DarkMode />}
                  iconPosition='start'
                  label={dark ? 'Light Mode (why?)' : 'Dark Mode (please)'}
                  onClick={() => setDark(!dark)}
                />
              </Tabs>
            </Layout>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}
