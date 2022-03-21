import styled from '@emotion/styled'
import { Keyboard, RotateRight, Save, Settings } from '@mui/icons-material'
import { Button, ButtonGroup, Card, Chip, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup } from '@mui/material'
import React, { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import { BattleCell } from './BattleCell'
import { Size } from './BattleGrid'
import { socket } from './BattleShip'
import { RulesEditor } from './RulesEditor'
import { BattleshipFleetType, BattleshipPlayer, Rotation, Rotations, ShipType, ShipTypes } from './types'

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
  if(inBounds(coordinates) && sameRow(coordinates) || sameColumn(coordinates))
    return coordinates
  else
    return undefined
}

const getTransformation = (rotation: Rotation) => {
  switch(rotation) {
    case 'right':
      return (selected: number) => (_, index) => selected + index
      case 'down':
      return (selected: number) => (_, index) => selected + index * 10
      case 'left':
      return (selected: number) => (_, index) => selected - index
      case 'up':
      return (selected: number) => (_, index) => selected - index * 10
  }
}

const getSelected = (ship: ShipType, selected: number, rotation: Rotation): number[] => {
  const transformation = getTransformation(rotation)(selected)
  switch(ship) {
    case 'Carrier':
      return [...Array(5)].map(transformation)
      case 'BattleShip':
      return [...Array(4)].map(transformation)
      case 'Destroyer':
      return [...Array(3)].map(transformation)
      case 'Submarine':
      return [...Array(3)].map(transformation)
      case 'Patrol Boat':
      return [...Array(2)].map(transformation)
  }
}

type ShipSelectionGridProps = {
  player: BattleshipPlayer
  size: Size
}

export const ShipSelectionGrid: React.FC<ShipSelectionGridProps> = ({ player, size }) => {
  const [hover, setHover] = useState<number>(-10)
  const [selectedShip, setSelectedShip] = useState<ShipType>('Carrier')
  const [ships, setShips] = useState<{[key: string]: number[]}>({})
  const [rotation, setRotation] = useState<Rotation>('right')
  const placedShips = Object.values(ships).flatMap(item => item)
  const hovered = validate(getSelected(selectedShip, hover, rotation))

  const rotate = () => {
      const index = Rotations.findIndex((r) => rotation == r)
        setRotation(index == Rotations.length - 1 ? Rotations[0] : Rotations[index + 1])
  }

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    switch(event.key) {
      case 'r': {
        rotate()
        break
      }
    }
  }

  const addShip = () => {
    const newShips = {...ships}
    newShips[selectedShip] = hovered ? hovered : []
    setShips(newShips)
  }

  const sendGrid = () => {
    socket.send(JSON.stringify({name: player.name, command: 'ADD_BOARD', ships: ships}))
  }

  return (
    <>
    <GridWrapper onMouseLeave={() => setHover(-10)} onKeyDown={(e) => handleKey(e)} tabIndex={0}>
      <GridView container columns={10}>
        {[...Array(100)].map((_, index) => <BattleCell key={index} size={size} status={placedShips.includes(index) ? 'Ship' : 'Untouched'} hover={hovered ? hovered.includes(index) : false} setHover={() => setHover(index)} onClick={addShip} />)}
      </GridView>
    </GridWrapper>
    <RadioGroup row onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedShip(e.target.value as ShipType)}>
      {ShipTypes.map(ship => <FormControlLabel key={ship} value={ship} control={<Radio />} label={ship} />)}
    </RadioGroup>
    <ButtonGroup variant='outlined'>
      <Button startIcon={<RotateRight />} onClick={rotate} >
         Rotate
        </Button>
      <Button startIcon={<Save />} onClick={sendGrid} >
         Save
        </Button>
      </ButtonGroup>
    </>
  )
}
