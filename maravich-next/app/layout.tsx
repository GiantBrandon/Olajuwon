'use client'

import { useEffect } from 'react'
import { MUIWrapper } from './MUIWrapper'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <html lang='en'>
      <head>
        <title>Brandon Kurtz's Website</title>
      </head>
      <body style={{ position: 'absolute', bottom: 0, right: 0, margin: 0 }}>
        <MUIWrapper>
          {children}
        </MUIWrapper>
      </body>
    </html>
  )
}
