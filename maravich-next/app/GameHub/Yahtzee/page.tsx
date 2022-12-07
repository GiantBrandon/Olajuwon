'use client'

import { Badge, Button, ButtonBase, List, ListItem, ListItemIcon, ListItemText, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { DieCharacters, Player, Score, Scores } from './types'

const newPlayer = (name: string): Player => {
  return {
    name,
    scores: {
      ['ones']: undefined,
      ['twos']: undefined,
      ['threes']: undefined,
      ['fours']: undefined,
      ['fives']: undefined,
      ['sixes']: undefined,
      ['bonus']: 0,
      ['3 of a kind']: undefined,
      ['4 of a kind']: undefined,
      ['full house']: undefined,
      ['small straight']: undefined,
      ['large straight']: undefined,
      ['yahtzee']: undefined,
      ['chance']: undefined,
      ['yahtzee bonus']: undefined,
      ['top total']: 0,
      ['bottom total']: 0,
      ['grand total']: 0,
    }
  }
}

const sum = (dice: number[]): number => dice.reduce((previous, current) => previous + current)

const contains = (dice: number[], nums: number[]) => nums.every(num => dice.includes(num))

const calculateScores = (dice: number[]): Record<Score, number> => {
  const sortedDice = [...dice].sort()
  return {
    ['ones']: dice.filter(die => die == 1).length,
    ['twos']: dice.filter(die => die == 2).length * 2,
    ['threes']: dice.filter(die => die == 3).length * 3,
    ['fours']: dice.filter(die => die == 4).length * 4,
    ['fives']: dice.filter(die => die == 5).length * 5,
    ['sixes']: dice.filter(die => die == 6).length * 6,
    ['bonus']: 0,
    ['3 of a kind']: dice.filter(die => dice.filter(otherDie => die == otherDie).length >= 3).length > 0 ? sum(dice) : 0,
    ['4 of a kind']: dice.filter(die => dice.filter(otherDie => die == otherDie).length >= 4).length > 0 ? sum(dice) : 0,
    ['full house']: sortedDice[0] == sortedDice[2] && sortedDice[3] == sortedDice[4] ||
    sortedDice[0] == sortedDice[1] && sortedDice[2] == sortedDice[4] ? 25 : 0,
    ['small straight']: contains(dice, [1,2,3,4]) || contains(dice, [2,3,4,5]) || contains(dice, [3,4,5,6]) ? 30 : 0,
    ['large straight']: contains(dice, [1,2,3,4,5]) || contains(dice, [2,3,4,5,6]) ? 40 : 0,
    ['yahtzee']: dice.every(die => die == dice[0]) ? 50 : 0,
    ['chance']: sum(dice),
    ['yahtzee bonus']: 0,
    ['top total']: 0,
    ['bottom total']: 0,
    ['grand total']: 0,
  }
}

const top: Score[] = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function Yahtzee() {
  const [players, setPlayers] = useState<Player[]>([newPlayer('first'), newPlayer('second')])
  const [dice, setDice] = useState<number[]>([1,1,1,1,1])
  const [rolls, setRolls] = useState(3)
  const [selected, setSelected] = useState<boolean[]>([false, false, false, false, false])
  const [loading, setLoading] = useState(false)
  const scores = calculateScores(dice)

  return (
    <Stack direction='row' height='100%'>
      <List>
        {dice.map((die, index) =>
          <ListItem key={index} button disabled={rolls == 3} selected={selected[index]} onClick={() => setSelected({...selected, [index]: !selected[index]})}>
            <ListItemIcon sx={{ fontSize: '4rem' }}>
              {loading && !selected[index] ? '...' : DieCharacters[die]}
            </ListItemIcon>
          </ListItem>
        )}
        <ListItem button onClick={() => {
          const newDice = dice.map((die, index) => selected[index] ? die : Math.floor(Math.random() * 6) + 1)
          setRolls(rolls => rolls - 1)
          setLoading(true)
          setTimeout(() => {
            setDice(newDice)
            setLoading(false)
          }, 500)
        }}
        disabled={rolls == 0}
        >
          <Badge badgeContent={rolls} color='primary'>
            <ListItemText>
              roll
            </ListItemText>
          </Badge>
        </ListItem>
      </List>
      <TableContainer sx={{ height: '100%'}}>
        <Table size='small' sx={{ width: `${150 * (players.length + 1)}px` }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '150px' }}>Player</TableCell>
              {players.map(player => <TableCell key={player.name} sx={{ width: '150px' }}>{player.name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: 'scroll' }}>
            {Scores.map(score => <StyledTableRow key={score}>
              <TableCell>{score}</TableCell>
              {players.map((player, index) => <TableCell key={player.name}>
                <Button disabled={rolls == 3 || player.scores[score] != undefined} onClick={() => {
                  players[index] = {
                    name: player.name,
                    scores: {
                      ...player.scores,
                      [score]: scores[score],
                      'top total': player.scores['top total']!! + (top.includes(score) ? scores[score] : 0),
                      'bottom total': player.scores['bottom total']!! + (top.includes(score) ? 0 : scores[score]),
                      'grand total': player.scores['grand total']!! + scores[score] }
                  }
                  setPlayers(players)
                  setRolls(3)
                  setDice([1,1,1,1,1])
                  setSelected([false, false, false, false, false])
                }}>
                  {player.scores[score] || scores[score]}
                </Button>
              </TableCell>)}
            </StyledTableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
