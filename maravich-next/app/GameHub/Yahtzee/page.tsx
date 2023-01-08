'use client'

import { Badge, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { DieCharacters, Player, Score, Scores } from './types'
import { useYahtzee } from './useYahtzee'

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
  const { players, dice, rollYahtzee, rolls, selected, setSelected, state, scores, turn, setScore } = useYahtzee()
  return (
    <Stack direction='row' height='100%'>
      <List>
        {dice.map((die, index) =>
          <ListItem key={index} button disabled={rolls == 3} selected={selected[index]} onClick={() => setSelected({...selected, [index]: !selected[index]})}>
            <ListItemIcon sx={{ fontSize: '4rem' }}>
              {state == 'rolling' && !selected[index] ? '...' : DieCharacters[die]}
            </ListItemIcon>
          </ListItem>
        )}
        <ListItem>------</ListItem>
        <ListItemButton 
          onClick={rollYahtzee}
          disabled={ turn == 1 || rolls == 0}
        >
          <Badge badgeContent={rolls} color='primary'>
            <ListItemText>
              roll
            </ListItemText>
          </Badge>
        </ListItemButton>
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
                <Button
                  disabled={rolls == 3 || index != turn}
                  color={player.scores[score] != undefined ? 'success' : 'inherit'}
                  onClick={() => setScore(score)}
                >
                  {player.scores[score] != undefined ? player.scores[score] : rolls == 3 ? '--' : scores[score]}
                </Button>
              </TableCell>)}
            </StyledTableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
