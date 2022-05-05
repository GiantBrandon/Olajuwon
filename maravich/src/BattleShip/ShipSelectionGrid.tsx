import styled from '@emotion/styled'
import { Gavel, RotateRight, Save } from '@mui/icons-material'
import { Button, ButtonGroup, FormControlLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material'
import React, { KeyboardEvent, useState } from 'react'
import { CenteredDiv } from '../styles'
import { BattleCell } from './BattleCell'
import { socket } from './BattleShip'
import { RulesEditor } from './RulesEditor'
import { BattleshipGame, Rotation, Rotations, ShipType, ShipTypes, TetrisTypes } from './types'

const GridWrapper = styled(Paper)({
  width: '480px',
  height: '480px'
})

const GridView = styled(Grid)({
  height: '100%'
})

const sameRow = (coordinates: number[]): boolean => coordinates.every(coordinate => Math.floor(coordinate / 10) == Math.floor(coordinates[0] / 10))

const sameColumn = (coordinates: number[]): boolean => coordinates.every(coordinate => coordinate % 10 == coordinates[0] % 10)

const inBounds = (coordinates: number[]): boolean => coordinates.every(coordinate => coordinate < 100 && coordinate >= 0)

const validate = (coordinates: number[]): number[] | undefined => {
  return coordinates
  /*if(inBounds(coordinates) && sameRow(coordinates) || sameColumn(coordinates))
    return coordinates
  else
    return undefined*/
}

const getTransformation = (rotation: Rotation, ) => {
  switch(rotation) {
  case 'right':
    return (selected: number) => (x, y) => selected + x + y * 10
  case 'down':
    return (selected: number) => (x, y) => selected + x * 10 - y
  case 'left':
    return (selected: number) => (x, y) => selected - x - y * 10
  case 'up':
    return (selected: number) => (x, y) => selected - x * 10 + y
  }
}

const getSelected = (ship: ShipType, selected: number, rotation: Rotation): number[] => {
  const transform = getTransformation(rotation)(selected)
  switch(ship) {
  case 'Carrier':
    return [transform(0,0), transform(1, 0), transform(2, 0), transform(3, 0), transform(4, 0)]
  case 'BattleShip':
    return [transform(0,0), transform(1, 0), transform(2, 0), transform(3, 0)]
  case 'Destroyer':
    return [transform(0,0), transform(1, 0), transform(2, 0)]
  case 'Submarine':
    return [transform(0,0), transform(1, 0), transform(2, 0)]
  case 'Patrol Boat':
    return [transform(0,0), transform(1, 0)]
  case 'O-Block':
    return [transform(0,0), transform(1, 0), transform(0, 1), transform(1, 1)]
  case 'Hero-Block':
    return [transform(0,0), transform(1, 0), transform(2, 0), transform(3, 0)]
  case 'S-Block':
    return [transform(0,0), transform(1, 0), transform(1, -1), transform(2, -1)]
  case 'Z-Block':
    return [transform(0,0), transform(1, 0), transform(1, 1), transform(2, 1)]
  case 'L-Block':
    return [transform(0,0), transform(1, 0), transform(2, 0), transform(2, -1)]
  case 'J-Block':
    return [transform(0,0), transform(1, 0), transform(2, 0), transform(2, 1)]
  case 'T-Block':
    return [transform(0,0), transform(1, 0), transform(1, 1), transform(2, 0)]
  }
}

type ShipSelectionProps = {
  game: BattleshipGame
}

export const ShipSelection: React.FC<ShipSelectionProps> = ({ game }) => {
  const [hover, setHover] = useState<number>(-10)
  const [selectedShip, setSelectedShip] = useState<ShipType>('Carrier')
  const [ships, setShips] = useState<{[key: string]: number[]}>({})
  const [rotation, setRotation] = useState<Rotation>('right')
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const placedShips = Object.values(ships).flatMap(item => item)
  const hovered = validate(getSelected(selectedShip, hover, rotation))

  const rotate = () => {
    const index = Rotations.findIndex((r) => rotation == r)
    setRotation(index == Rotations.length - 1 ? Rotations[0] : Rotations[index + 1])
  }

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    switch(event.key) {
    case 'r':
      rotate()
      break
    }
  }

  const addShip = () => {
    const newShips = {...ships}
    newShips[selectedShip] = hovered ? hovered : []
    setShips(newShips)
  }

  const sendGrid = () => {
    socket.send(JSON.stringify({name: game.self.name, command: 'ADD_BOARD', ships: ships}))
  }

  return (
    <CenteredDiv>
      <GridWrapper onMouseLeave={() => setHover(-10)} onKeyDown={(e) => handleKey(e)} tabIndex={0}>
        <GridView container columns={10}>
          {[...Array(100)].map((_, index) => <BattleCell key={index} size={'large'} status={placedShips.includes(index) ? 'Ship' : 'Untouched'} hover={hovered ? hovered.includes(index) : false} setHover={() => setHover(index)} onClick={addShip} />)}
        </GridView>
      </GridWrapper>
      <RadioGroup row onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedShip(e.target.value as ShipType)}>
        {game.rules.shipType == 'Ships' ? ShipTypes.map(ship => <FormControlLabel key={ship} value={ship} control={<Radio />} label={ship} />) : TetrisTypes.map(tetris => <FormControlLabel key={tetris} value={tetris} control={<Radio />} label={tetris} />)}
      </RadioGroup>
      <ButtonGroup variant='outlined'>
        <Button startIcon={<RotateRight />} onClick={rotate} >
         Rotate
        </Button>
        <Button startIcon={<Save />} onClick={sendGrid} >
         Save
        </Button>
        <Button startIcon={<Gavel />} onClick={() => setIsRulesOpen(true)} >
         Change Rules
        </Button>
      </ButtonGroup>
      <RulesEditor open={isRulesOpen} handleClose={() => setIsRulesOpen(false)} rules={game.rules}/>
    </CenteredDiv>
  )
}
