import styled from '@emotion/styled'
import { Brush } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import background from '../background.png'

const Background = styled.img({
  position: 'absolute',
  bottom: 0,
  right: 0,
})

const ShellyLink = styled(Button)({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
})

export const Homepage: React.FC = () => {
  return (
    <>
      {window.innerHeight / window.innerWidth < .65 ? <Background src={background} alt='background' width='100%' height='auto' /> : <Background src={background} alt='background' width='auto' height='100%' />}
      <ShellyLink
        style={{ fontSize: '24px' }}
        color={'primary'}
        size={'large'}
        startIcon={<Brush />}
        href={'https://tjdthwjd.carrd.co/'}
      >
          Visit Artist
      </ShellyLink>
    </>
  )
}
