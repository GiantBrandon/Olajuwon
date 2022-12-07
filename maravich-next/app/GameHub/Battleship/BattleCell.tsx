import styled from '@emotion/styled'
import { Anchor, Close, DirectionsBoat, ModeStandby, QuestionMark, Water } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
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

const getIcon = (status: BattleshipCellStatus, size: Size, colors: any) => {
  switch (status) {
  case 'Untouched':
    return <Water fontSize={size} color={colors.untouched} />
  case 'Hit':
    return <Anchor fontSize={size} color={colors.hit} />
  case 'Miss':
    return <Close fontSize={size} color={colors.miss}/>
  case 'Ship':
    return <DirectionsBoat fontSize={size} color={colors.ship} />
  case 'Target':
    return <ModeStandby fontSize={size} color={colors.target} />
  default:
    return <QuestionMark fontSize={size} />
  }
}

type BattleCellProps = {
  position: number
  status: BattleshipCellStatus
  colors: any
  hover: boolean
  size: Size
  setHover: () => void
  onClick?: () => void
}

export const BattleCell: React.FC<BattleCellProps> = ({ position, status, colors, hover, size, setHover, onClick }) => {
  return (
    <Tooltip title={`${position}: ${status}`} disableInteractive>
      <GridItem hover={hover} onMouseEnter={setHover} onClick={onClick}>
        {getIcon(status, size, colors)}
      </GridItem>
    </Tooltip>
  )
}
