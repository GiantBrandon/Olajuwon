'use client'

import styled from '@emotion/styled'
import { Button, Stack, Typography } from '@mui/material'
import { CounterState } from 'mutombo'
import React, { useEffect, useState } from 'react'

const Layout = styled.div({
  display: 'grid',
  gridTemplate: '\n"header header header" min-content\n"left main right" 1fr\n"footer footer footer" min-content\n / min-content 1fr min-content',
  height: '100%'
})

const Main = styled.div({
  gridArea: 'main',
  alignSelf: 'center',
  textAlign: 'center'
})

const TowerDefense: React.FC = () => {
  const [counter, setCounter] = useState<CounterState>()
  const [tick, setTick] = useState(0)
  
  useEffect(() => {
    (async() => {
      const wasm = await import('mutombo')
      await wasm.default()
      console.log(wasm)
      wasm.start()
    })()
  }, [])
  
  return (
    <div style={{ height: '100%', width: '100%'}} id='canvas' />
  )
}

export default TowerDefense
