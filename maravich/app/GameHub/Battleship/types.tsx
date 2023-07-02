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

export const ShipTypes = ['Carrier', 'BattleShip', 'Destroyer', 'Submarine', 'Patrol Boat']
export const TetrisTypes = ['O-Block', 'Hero-Block', 'S-Block', 'Z-Block', 'L-Block', 'J-Block', 'T-Block']
export type ShipType = typeof ShipTypes[number] | typeof TetrisTypes[number]

export type BattleshipStatus = 'Setup' | 'Active' | 'End'

export type BattleshipGame = {
  self: BattleshipPlayer
  others: BattleshipPlayer[],
  rules: BattleshipRules,
  messages: string[],
  status: BattleshipStatus
}

export type BattleshipRules = {
    shipType: BattleshipFleetType,
    fireType: BattleshipFireType
  }

export type BattleshipPlayer = {
  name: string
  board: BattleshipCellStatus[]
  colors: any,
  order: number
  shipCount: number
  cheater: boolean
}