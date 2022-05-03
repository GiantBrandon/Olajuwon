import { Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { BattleGrid, Size } from './BattleGrid'
import { BattleshipPlayer } from './types'

type EnemyPanelProps = {
  enemies: BattleshipPlayer[]
}

export const EnemyPanel: React.FC<EnemyPanelProps> = ({enemies}) => {
  const [columns, setColumns] = useState(0)
  const [gridSize, setGridSize] = useState<Size>('small')
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(wrapperRef.current){
      const height = wrapperRef.current.offsetHeight
      const width = wrapperRef.current.offsetWidth
      if (Math.floor(height / 384) * Math.floor(width / 384) >= enemies.length) {
        setGridSize('large')
        setColumns(Math.floor(height / 384))
      } else if (Math.floor(height / 264) * Math.floor(width / 264) >= enemies.length) {
        setGridSize('medium')
        setColumns(Math.floor(height / 264))
      } else {
        setGridSize('small')
        setColumns(Math.floor(height / 184) > 0 ? Math.floor(height / 184) : 1)
      }
    }
  }, [wrapperRef, enemies])

  return (
    <Grid height={'100%'} ref={wrapperRef} direction='column' container item xs columns={columns} justifyContent='space-around'>
      {enemies.map(enemy => (
        <Grid item xs={1}>
          <BattleGrid key={enemy.name} player={enemy} size={gridSize} />
        </Grid>
      ))}
    </Grid>
  )
}
