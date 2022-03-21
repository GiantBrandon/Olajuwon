import styled from '@emotion/styled'
import { green, red } from '@mui/material/colors'
import React from 'react'
import { Stats } from '../Utils/types'

type PlayerStatsProps = {
  player: Stats
  low: Stats
  high: Stats
}

const RedStat = styled.p({
  color: red[500],
})

const GreenStat = styled.p({
  color: green[500],
})

export const PlayerStats: React.FC<PlayerStatsProps> = (props) => {
  const { player, low, high } = props

  const displayStat = (
    label: string,
    playerValue: number,
    lowvalue: number,
    highValue: number
  ) => {
    if (playerValue <= lowvalue)
      return (
        <RedStat>
          {label}: {playerValue}
        </RedStat>
      )
    else if (playerValue >= highValue)
      return (
        <GreenStat>
          {label}: {playerValue}
        </GreenStat>
      )
    else
      return (
        <p>
          {label}: {playerValue}
        </p>
      )
  }
  return (
    <>
      {displayStat('Points', player.points, low.points, high.points)}
      {displayStat('Rebounds', player.totReb, low.totReb, high.totReb)}
      {displayStat('Assists', player.assists, low.assists, high.assists)}
      {displayStat('Blocks', player.blocks, low.blocks, high.blocks)}
      {displayStat('Steals', player.steals, low.steals, high.steals)}
      {displayStat('Field Goal %', player.fgp, low.fgp, high.fgp)}
      {displayStat('3 Point %', player.tpp, low.tpp, high.tpp)}
      {displayStat('Free Throw %', player.ftp, low.ftp, high.ftp)}
    </>
  )
}
