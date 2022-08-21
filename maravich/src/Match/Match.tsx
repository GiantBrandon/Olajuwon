import styled from '@emotion/styled'
import { Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { CircularProgressWithValue } from './CircularProgressWithValue'
import { useMatch } from './useMatch'

const SizeWrapper = styled(Grid)({
  flex: 1,
})

const MatchWrapper = styled(Paper)({
  position: 'absolute',
  bottom: 0,
})

const colors = ['primary','warning','success','error', 'default'] as any
const symbols = ['♤','♢','♧','♡','💣']

const Match: React.FC = () => {
  const { board, pops, turns, selected, matches, complete, setSelected, findGroupSize, explode, swapPieces } = useMatch()
  const ref = useRef<HTMLDivElement>(null)
  const size = ref.current ? Math.min(ref.current.offsetHeight, ref.current.offsetWidth) : 0
  
  return (
    <Stack height='100%'>
      <Typography textAlign='center' variant='h5' component='h5'>
        Match 3 - Daily
      </Typography>
      <Grid container>
        <Grid item xs>Pops:</Grid>
        <Grid item xs><CircularProgressWithValue value={pops} /></Grid>
      </Grid>

      <Grid container>
        <Grid item xs>Turns:</Grid>
        <Grid item xs>{turns}</Grid>
      </Grid>
      <Grid container item xs='auto'>
        <Grid item xs={6}>Score:</Grid>
        <Grid item xs={6}>{10-turns}.{String(pops).padStart(3, '0')}</Grid>
      </Grid>
      <SizeWrapper container item xs ref={ref}>
        <MatchWrapper sx={{ width: size }}>
          <Grid container>
            {board.map((row, rIndex) => 
              row.map((cell, cIndex) => {
                const isSelected = rIndex === selected[0] && cIndex === selected[1]
                return (<Grid item xs={1} key={`${rIndex},${cIndex}`}>
                  <IconButton
                    disabled={complete}
                    color={findGroupSize([rIndex, cIndex], matches) ? 'default' : colors[cell]}
                    onClick={() => {
                      if (cell === 4)
                        explode()
                      else if (isSelected)
                        setSelected([-1, -1])
                      else if (
                        (selected[0] === rIndex || selected[1] === cIndex) &&
                        (Math.abs(selected[0] - rIndex) === 1 || Math.abs(selected[1] - cIndex) === 1)
                      ) {
                        swapPieces(selected[0], selected[1], rIndex, cIndex)
                      }
                      else
                        setSelected([rIndex, cIndex])
                    }}
                  >
                    {cell === -1 ?  '-' : symbols[cell]}
                  </IconButton>
                </Grid>)
              })
            )}
          </Grid>
        </MatchWrapper>
      </SizeWrapper>
    </Stack>
  )
}

export default Match
