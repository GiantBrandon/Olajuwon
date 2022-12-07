'use client'

import { Casino, Castle, DirectionsBoat, SwapHoriz } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { GameInfo } from './GameInfo'


export default function GameHub() {
  return (
    <Grid container spacing={3}>
      <Grid item xs='auto'>
        <GameInfo href='/GameHub/Battleship' icon={<DirectionsBoat sx={{ fontSize: '80px'}} />} title='Battleship' description='Done' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo href='/GameHub/Match' icon={<SwapHoriz sx={{ fontSize: '80px'}} />} title='Match 3' description='Done' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo href='/GameHub/TowerDefense' icon={<Castle sx={{ fontSize: '80px'}} />} title='Tower Defense' description='TODO' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo href='/GameHub/Yahtzee' icon={<Casino sx={{ fontSize: '80px'}} />} title='Yahtzee' description='WIP' />
      </Grid>
    </Grid>
  )
}