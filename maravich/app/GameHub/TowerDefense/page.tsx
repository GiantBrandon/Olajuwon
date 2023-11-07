'use client'

import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import background from '../public/background.webp'
import Script from 'next/script'

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
  return (
    <>
      <canvas width={640} height={480} id="canvas" onContextMenu={(e) => e.preventDefault} tabIndex={-1} />
    </>
  )
}

export default TowerDefense
