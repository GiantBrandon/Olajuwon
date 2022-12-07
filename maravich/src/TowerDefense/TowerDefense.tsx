import styled from '@emotion/styled'
import { Add } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'

const View = styled.div({
  display: 'grid',
  gridTemplate: `
  "game sidebar" min-content
  "stats sidebar" 1fr /
  min-content 1fr
  `
})

const Game = styled.div({
  gridArea: 'game',
  display: 'flex',
  height: '288px',
  width: '288px'
})

const Sidebar = styled.div({
  gridArea: 'sidebar'
})

const Stats = styled.div({
  gridArea: 'stats'
})

export const TowerDefense: React.FC = () => {

  return (
    <View>
      <Game>
        {[...Array(144)].map((_, index) => <Add />)}
      </Game>
      <Sidebar>sidebar</Sidebar>
      <Stats>stats</Stats>
    </View>
  )
}