

export type BattleshipCellStatus = 'Untouched' | 'Hit' | 'Miss' | 'Ship' | 'Target'

export const BattleshipFleetTypes = ['Ships', 'Tetris'] as const
export type BattleshipFleetType = typeof BattleshipFleetTypes[number]

const battleshipFireDescriptions: {type: string, description: string}[] = [
  {
    type: 'Original', 
    description: 'Turn Based. Every turn the player gets one shot, that hits a specific player in the spot they choose.',
  },
  {
    type: 'Equality', 
    description: 'Turn Based. Every turn the player gets one shot, that hits every player in the spot they choose.',
  },
  {
    type: 'Justice', 
    description: 'Turn Based. Every turn the player gets a number of shots equal to the amount of ships they have left, that hits a specific player in the spot they choose.',
  },
  {
    type: 'BattleRoyale', 
    description: 'Round Based. Every turn the player gets a number of shots equal to the amount of ships they have left, that hits a specific player in the spot they choose.',
  },
  {
    type: 'FreeForAll', 
    description: 'Turn Based. Every turn the player gets one shot, that hits a specific player in the spot they choose.',
  }
]
export const BattleshipFireTypes = battleshipFireDescriptions.map(description => description.type)
export type BattleshipFireType = typeof BattleshipFireTypes[number]
export const fireTypeDescriptions = (type: BattleshipFireType) => battleshipFireDescriptions.find(description => description.type == type)?.description

export const Rotations = ['right', 'down', 'left', 'up'] as const
export type Rotation = typeof Rotations[number]

export const ShipTypes = ['Carrier', 'BattleShip', 'Destroyer', 'Submarine', 'Patrol Boat'] as const
export type ShipType = typeof ShipTypes[number]

export type BattleshipGame = {
  self: BattleshipPlayer
  others: BattleshipPlayer[],
  rules: BattleshipRules
}

export type BattleshipRules = {
    shipType: BattleshipFleetType,
    fireType: BattleshipFireType
  }

export type BattleshipPlayer = {
  name: string
  board: BattleshipCellStatus[]
  active: boolean
  defeat: boolean
}