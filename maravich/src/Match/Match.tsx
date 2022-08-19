import styled from '@emotion/styled'
import { Grid, IconButton, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { getTodaysMatch } from '../Api/Router'

const SizeWrapper = styled.div({
  height: '100%'
})

const MatchWrapper = styled(Paper)({
  position: 'absolute',
  bottom: 0,
})

const colors = ['primary','warning','success','error', 'default'] as any
const symbols = ['♤','♢','♧','♡','💣']

export const Match: React.FC = () => {
  const [board, setBoard] = useState<number[][]>([[]])
  const [replacements, setReplacements] = useState<number[]>([])
  const [selected, setSelected] = useState<number[]>([-1, -1])
  const [matches, setMatches] = useState<number[][][]>([])
  const [pops, setPops] = useState(0)
  const [turns, setTurns] = useState(0)
  const [waiting, setWaiting] = useState(false)
  const [exploding, setExploding] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const size = ref.current ? Math.min(ref.current.offsetHeight, ref.current.offsetWidth) : 0

  useEffect(() => {
    getTodaysMatch().then(match => {
      setBoard(match.board)
      setReplacements(match.replacements)
    })
  }, [])

  useEffect(() => {
    if(pops > 100)
      setBoard([[]])
  }, [pops])
  
  useEffect(() => {
    if (board.length <= 1 || waiting)
      return
    if(matches.length > 0) {
      setPops(pops + matches.reduce((prev, match) => prev + match.length, 0))
      const clearedBoard = clearMatches(matches, board)
      dropPieces(clearedBoard)
      setMatches([])
      setWaiting(true)
    } else if (board.some(row => row.some(cell => cell === -1))) {
      const newBoard = board.map(row =>
        row.map(cell => cell === -1 ? replacements.pop() as number : cell)
      )
      setReplacements(replacements)
      setBoard(newBoard)
      setMatches([])
      setWaiting(true)
    } else {
      setMatches(findAllMatches(board))
      setWaiting(true)
    }
    setTimeout(() => setWaiting(false), 250)
  }, [board, waiting])

  const isValid = (row: number, column: number, board: number[][]) => {
    return board.length > 0 &&
      row >= 0 && row < board.length &&
      column >= 0 && column < board[row].length
  }

  const connectHorizontal = (value: number, values: number[][], row: number, column: number): number[][] => {
    if (
      !isValid(row, column, board) ||
      value !== board[row][column] ||
      values.some(coordinate => coordinate[0] === row && coordinate[1] === column)
    )
      return values
    else {
      return addMatchHorizontal(value, values, row, column)
    }
  }

  const connectVertical = (value: number, values: number[][], row: number, column: number): number[][] => {
    if (
      !isValid(row, column, board) ||
      value !== board[row][column] ||
      values.some(coordinate => coordinate[0] === row && coordinate[1] === column)
    )
      return values
    else {
      return addMatchVertical(value, values, row, column)
    }
  }

  const addMatchHorizontal = (value: number, values: number[][], row: number, column: number): number[][] => {
    const self = [...values, [row, column]]
    const east = connectHorizontal(value, self, row, column + 1)
    const west = connectHorizontal(value, east, row, column - 1)
    return west
  }

  const addMatchVertical = (value: number, values: number[][], row: number, column: number): number[][] => {
    const self = [...values, [row, column]]
    const north = connectVertical(value, self, row - 1, column)
    const south = connectVertical(value, north, row + 1, column)
    return south
  }

  const findGroupSize = (coordinate: number[], groups: number[][][]): number => {
    const match = groups.find(group => group.some(item => item[0] === coordinate[0] && item[1] === coordinate[1]))
    return match ? match.length : 0
  }

  const fall = (row: number, column: number, board: number[][]): number[][] => {
    if (row < 8 && board[row + 1][column] === -1) {
      board[row + 1][column] = board[row][column]
      board[row][column] = -1
      return fall(row + 1, column, board)
    }
    return board
  }
  
  const findAllMatches = (board: number[][]): number[][][] => {
    let allMatches: number[][][] = []
    board.map((row, rIndex) => {
      row.map((cell, cIndex) => {
        if (cell !== -1 && cell !== 4 && findGroupSize([rIndex, cIndex], allMatches) == 0) {
          const horizontal = addMatchHorizontal(cell, [], rIndex, cIndex)
          const vertical = addMatchVertical(cell, [], rIndex, cIndex)
          if(horizontal.length > vertical.length && horizontal.length > 2)
            allMatches = [...allMatches, horizontal]
          else if(vertical.length > 2)
            allMatches = [...allMatches, vertical]
        }
      })
    })
    return allMatches
  }

  const clearMatches = (matches: number[][][], board: number[][]): number[][] => {
    const newBoard = [...board]
    newBoard.map((row, rIndex) => {
      newBoard[rIndex] = [...row]
      row.map((_, cIndex) => {
        const groupSize = findGroupSize([rIndex, cIndex], matches)
        if (groupSize > 0) {
          newBoard[rIndex][cIndex] = groupSize > 4 && !exploding ? 4 : -1
        }
      })
    })
    setExploding(false)
    return newBoard
  }

  const dropPieces = (board: number[][]) => {
    let newBoard = [...board]
    for (let rIndex = 7; rIndex > -1; rIndex--) {
      for (let cIndex = 0; cIndex < 12; cIndex++) {
        newBoard = fall(rIndex, cIndex, newBoard)
      }
    }
    setBoard(newBoard)
  }

  const swapPieces = (originalRow: number, originalColumn: number, newRow: number, newColumn: number) => {
    const newBoard = board.map(arr => arr.slice())
    newBoard[originalRow][originalColumn] = board[newRow][newColumn]
    newBoard[newRow][newColumn] = board[originalRow][originalColumn]
    setBoard(newBoard)
    setSelected([-1, -1])
    setTurns(turns + 1)
  }

  const explode = () => {
    const explosion = board.flatMap((row, rIndex) => {
      return row.map((cell, cIndex) => {
        if (
          cell === 4 || 
          isValid(rIndex - 1, cIndex, board) && board[rIndex - 1][cIndex] == 4 ||
          isValid(rIndex + 1, cIndex, board) && board[rIndex + 1][cIndex] == 4 ||
          isValid(rIndex, cIndex + 1, board) && board[rIndex][cIndex + 1] == 4 ||
          isValid(rIndex, cIndex - 1, board) && board[rIndex][cIndex - 1] == 4
        ) {
          return [rIndex, cIndex]
        } else {
          return []
        }
      }).filter(index => index.length !== 0)
    })
    setExploding(true)
    setMatches([explosion])
    setPops(pops + explosion.length)
  }
  
  return (
    <>
      <p>
        Pops: {pops}
      </p>
      <p>
        Turns: {turns}
      </p>
      <SizeWrapper ref={ref}>
        <MatchWrapper sx={{ width: size }}>
          <Grid container>
            {board.map((row, rIndex) => 
              row.map((cell, cIndex) => {
                const isSelected = rIndex === selected[0] && cIndex === selected[1]
                return (<Grid item xs={1} key={`${rIndex},${cIndex}`}>
                  <IconButton
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
    </>
  )
}