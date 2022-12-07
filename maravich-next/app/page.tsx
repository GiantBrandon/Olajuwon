'use client'

import styled from '@emotion/styled'
import { Brush } from '@mui/icons-material'
import { Button } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import background from '../public/background.webp'

const Wrapper = styled.div({
  position: 'absolute',
  right: 0,
  bottom: 0
})

const Background = (ratio: number) => styled.div({
  position: 'relative',
  aspectRatio: '20 / 13',
  height: ratio > 20 / 13 ? undefined : '100vh',
  width: ratio > 20 / 13 ? '100vw' : undefined
})

const ShellyLink = styled(Button)({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
})

export default function Homepage() {
  const [ratio, setRatio] = useState(1)

  const onResize = () => {
    setRatio(window.innerWidth / window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    setRatio(window.innerWidth / window.innerHeight)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  
  const StretchingBackground = Background(ratio)
  return (
    <Wrapper>
      <StretchingBackground>
        <Image src={background} loading='lazy' alt='background' fill />
        <ShellyLink
          style={{ fontSize: '24px' }}
          color={'primary'}
          size={'large'}
          startIcon={<Brush />}
          href={'https://tjdthwjd.carrd.co/'}
        >
          Visit Artist
        </ShellyLink>
      </StretchingBackground>
    </Wrapper>
  )
}
