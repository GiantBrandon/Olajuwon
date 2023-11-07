'use client'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Player } from './players'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { PlayerSelector } from './PlayerSelector'

type stats = {
  games_played: number,
  player_id: number,
  season: number,
  min: string,
  fgm: number,
  fga: number,
  fg3m: number,
  fg3a: number,
  ftm: number,
  fta: number,
  oreb: number,
  dreb: number,
  reb: number,
  ast: number,
  stl: number,
  blk: number,
  turnover: number,
  pf: number,
  pts: number,
  fg_pct: number,
  fg3_pct: number,
  ft_pct: number
}

const now = new Date()

/*
refetch players

  useEffect(() => {
    const fetchPlayers = async () => {
      const promises = await Promise.all(Array(52).fill(undefined).map((_, index) => fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${index + 1}`)))
      const pages = await Promise.all(promises.map(p => (p.json() as any)))
      const test = pages.flatMap(page => {
        return page.data
      })

      console.log(test)
    }
    fetchPlayers()
  }, [])
*/

export default function JsonParser() {
  const [players, setPlayers] = useState<Player[]>([])
  const [stats, setStats] = useState<stats[]>([])
  const [recent, setRecent] = useState<stats[]>([])
  const ref = useRef<HTMLDivElement>()
  console.log(ref.current?.clientWidth, ref.current?.offsetWidth, ref.current?.scrollWidth)
  
  useEffect(() => {
    const params = players.map(player => `player_ids[]=${player.id}`).join('&')
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&${params}`).then(response => {
      console.log(response)
      setStats(response.data.data)
    })
  }, [players])

  return (
    <Box sx={{ marginY: 2 }} ref={ref}>
      <PlayerSelector players={players} setPlayers={setPlayers}/>
      <TableContainer component={Paper} sx={{ maxWidth: ref.current?.clientWidth || '100px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">PTS</TableCell>
              <TableCell align="right">REB</TableCell>
              <TableCell align="right">AST</TableCell>
              <TableCell align="right">BLK</TableCell>
              <TableCell align="right">STL</TableCell>
              <TableCell align="right">TO</TableCell>
              <TableCell align="right">FG%</TableCell>
              <TableCell align="right">3PM</TableCell>
              <TableCell align="right">3P%</TableCell>
              <TableCell align="right">FTM</TableCell>
              <TableCell align="right">FT%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat) => {
              const player = players.find(player => player.id === stat.player_id)
              return (
                <TableRow
                  key={stat.player_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${player?.first_name} ${player?.last_name}`}
                  </TableCell>
                  <TableCell align="right">{stat.pts}</TableCell>
                  <TableCell align="right">{stat.reb}</TableCell>
                  <TableCell align="right">{stat.ast}</TableCell>
                  <TableCell align="right">{stat.blk}</TableCell>
                  <TableCell align="right">{stat.stl}</TableCell>
                  <TableCell align="right">{stat.turnover}</TableCell>
                  <TableCell align="right">{stat.fg_pct}</TableCell>
                  <TableCell align="right">{stat.fg3m}</TableCell>
                  <TableCell align="right">{stat.fg3_pct}</TableCell>
                  <TableCell align="right">{stat.ftm}</TableCell>
                  <TableCell align="right">{stat.ft_pct}</TableCell>
                </TableRow>
              )}
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}