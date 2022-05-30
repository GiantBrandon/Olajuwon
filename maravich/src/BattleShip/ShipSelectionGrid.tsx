import { Gavel, List, PlayArrow, RotateRight, Save, Settings } from '@mui/icons-material'
import { Button, ButtonGroup, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from './BattleShip'
import { PlayerManager } from './PlayerManager'
import { PreferencesEditor } from './PreferencesEditor'
import { RulesEditor } from './RulesEditor'
import { ShipGrid } from './ShipGrid'
import { BattleshipGame, Rotation, Rotations, ShipType, ShipTypes, TetrisTypes } from './types'

const validate = (coordinates: number[]): number[] => {
  const [start, ...others] = coordinates
  let existing = [start]
  const isContinuous = others.every(other => {
    const foundContinuous = existing.some(coordinate => {
      return coordinate != other && 
      (Math.abs(coordinate - other) == 10 ||
      (Math.abs(coordinate - other) == 1 && Math.floor(coordinate / 10) === Math.floor(other / 10)))
    })
    existing = [other, ...existing]
    return foundContinuous
  })
  return isContinuous ? coordinates : []
}

const getTransformation = (rotation: Rotation, ) => {
  switch(rotation) {
  case 'right':
    return (selected: number) => (x: number, y: number) => selected + x + y * 10
  case 'down':
    return (selected: number) => (x: number, y: number) => selected + x * 10 - y
  case 'left':
    return (selected: number) => (x: number, y: number) => selected - x - y * 10
  case 'up':
    return (selected: number) => (x: number, y: number) => selected - x * 10 + y
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
  default:
    return []
  }
}

type ShipSelectionProps = {
  game: BattleshipGame
}

export const ShipSelection: React.FC<ShipSelectionProps> = ({ game }) => {
  const shipTypes = game.rules.shipType == 'Ships' ? ShipTypes : TetrisTypes
  const [hover, setHover] = useState<number>(-100)
  const [selectedShip, setSelectedShip] = useState<ShipType>(shipTypes[0])
  const [ships, setShips] = useState<{[key: string]: number[]}>({})
  const [rotation, setRotation] = useState<Rotation>('right')
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isPlayerManagerOpen, setIsPlayerManagerOpen] = useState(false)
  const {sendMessage} = useContext(SocketContext)
  const rules = useRef(game.rules)
  const placedShips = Object.values(ships).flatMap(item => item)
  const hovered = validate(getSelected(selectedShip, hover, rotation))
  const ready = game.others.every(player => player.shipCount > 0) && game.self.shipCount > 0

  useEffect(() => {
    if(game.rules.shipType != rules.current.shipType) {
      setShips({})
      setSelectedShip(shipTypes[0])
      rules.current = game.rules
    }
  }, [game])

  const rotate = () => {
    const index = Rotations.findIndex((r) => rotation == r)
    setRotation(index == Rotations.length - 1 ? Rotations[0] : Rotations[index + 1])
  }

  const addShip = () => {
    const newShips = {...ships}
    newShips[selectedShip] = hovered ? hovered : []
    setShips(newShips)
  }

  const sendGrid = () => {
    sendMessage(game.self.name, 'ADD_BOARD', {ships})
  }

  const startGame = () => {
    sendMessage(game.self.name, 'START_GAME', {})
  }

  return (
    <Stack height='100vh' justifyContent='center' alignItems='center'>
      <ShipGrid
        board={[...Array(100)].map((_, index) => placedShips.includes(index) ? 'Ship' : 'Untouched')}
        hovered={hovered}
        setHover={setHover}
        onClick={addShip}
      />
      <RadioGroup
        row
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedShip(e.target.value as ShipType)}
        defaultValue={ShipTypes[0]}
      >
        {shipTypes.map(ship => <FormControlLabel key={ship} value={ship} control={<Radio />} label={ship} />)}
      </RadioGroup>
      <ButtonGroup variant='outlined'>
        <Button startIcon={<RotateRight />} onClick={rotate} >
         Rotate
        </Button>
        <Button startIcon={<Save />} disabled={Object.keys(ships).length == shipTypes.length} onClick={sendGrid} >
         Save
        </Button>
        <Button startIcon={<PlayArrow />} disabled={!ready} onClick={startGame} >
         Start
        </Button>
        <Button startIcon={<Gavel />} onClick={() => setIsRulesOpen(true)} >
         Change Rules
        </Button>
        <Button startIcon={<Settings />} onClick={() => setIsPreferencesOpen(true)} >
          Preferences
        </Button>
        <Button startIcon={<List />} onClick={() => setIsPlayerManagerOpen(true)} >
          Players
        </Button>
      </ButtonGroup>
      <RulesEditor player={game.self} open={isRulesOpen} handleClose={() => setIsRulesOpen(false)} rules={game.rules}/>
      <PreferencesEditor open={isPreferencesOpen} handleClose={() => setIsPreferencesOpen(false)} />
      <PlayerManager game={game} open={isPlayerManagerOpen} handleClose={() => setIsPlayerManagerOpen(false)} />
    </Stack>
  )
}
