import styled from '@emotion/styled'
import { Anchor, Close, DirectionsBoat, ModeStandby, QuestionMark, Water } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { Size } from './BattleGrid'
import { BattleshipCellStatus } from './types'

const GridItem = styled.div((props: {hover: boolean}) => ({
  height: '10%',
  width: '10%',
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: props.hover ? grey[400] : undefined,
}))

const getIcon = (status: BattleshipCellStatus, size: Size) => {
  switch (status) {
  case 'Untouched':
    return <Water fontSize={size} color='primary' />
  case 'Hit':
    return <Anchor fontSize={size} color='disabled' />
  case 'Miss':
    return <Close fontSize={size} />
  case 'Ship':
    return <DirectionsBoat fontSize={size} color='success' />
  case 'Target':
    return <ModeStandby fontSize={size} />
  default:
    return <QuestionMark fontSize={size} />
  }
}

type BattleCellProps = {
  status: BattleshipCellStatus
  hover: boolean
  size: Size
  setHover: () => void
  onClick?: () => void
}

export const BattleCell: React.FC<BattleCellProps> = ({ status, hover, size, setHover, onClick }) => {	
  return (
    <GridItem hover={hover} onMouseEnter={setHover} onClick={onClick}>
      {getIcon(status, size)}
    </GridItem>
  )
}
