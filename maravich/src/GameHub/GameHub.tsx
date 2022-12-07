import { Casino, Castle, DirectionsBoat, SwapHoriz } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { GameInfo } from './GameInfo'


export const GameHub: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs='auto'>
        <GameInfo icon={<Castle sx={{ fontSize: '80px'}} />} title='Tower Defense' description='TODO' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo icon={<Casino sx={{ fontSize: '80px'}} />} title='Yahtzee' description='TODO' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo icon={<DirectionsBoat sx={{ fontSize: '80px'}} />} title='Battleship' description='TODO' />
      </Grid>
      <Grid item xs='auto'>
        <GameInfo icon={<SwapHoriz sx={{ fontSize: '80px'}} />} title='Match 3' description='TODO' />
      </Grid>
    </Grid>
  )
}