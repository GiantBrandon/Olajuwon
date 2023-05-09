'use client'

import { DarkMode, DataObject, Diamond, Home, LightMode, Login, VideogameAsset } from '@mui/icons-material'
import { Paper, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type SidebarProps = {
  dark: boolean,
  setDark: (dark: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ dark, setDark }) => {
  const [mobile, setMobile] = useState(true)
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMobile(window.innerHeight > window.innerWidth)
  })

  return (
    <Paper square sx={{ zIndex: 1 }}>
      <Tabs
        orientation={mobile ? 'horizontal' : 'vertical'}
        sx={{ zIndex: 1, width: mobile ? undefined : '200px' }}
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
    </Paper>
  )
}