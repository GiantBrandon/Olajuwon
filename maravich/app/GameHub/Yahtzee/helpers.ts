import { Score } from './types'
  
const sum = (dice: number[]): number => dice.reduce((previous, current) => previous + current)

const getScores = (dice: number[]): Record<Score, number> => {
  return {
    ['ones']: dice.filter(die => die == 1).length,
    ['twos']: dice.filter(die => die == 2).length * 2,
    ['threes']: dice.filter(die => die == 3).length * 3,
    ['fours']: dice.filter(die => die == 4).length * 4,
    ['fives']: dice.filter(die => die == 5).length * 5,
    ['sixes']: dice.filter(die => die == 6).length * 6,
    ['bonus']: 0,
    ['3 of a kind']: sum(dice),
    ['4 of a kind']: sum(dice),
    ['full house']: 25,
    ['small straight']: 30,
    ['large straight']: 40,
    ['yahtzee']: 50,
    ['chance']: sum(dice),
    ['yahtzee bonus']: 0,
    ['top total']: 0,
    ['bottom total']: 0,
    ['grand total']: 0,
  }
}

const threeOfAKindChance = (dice: number[]): { chance: number, keepers: number[] } => {
  const dieMap = dice.reduce((prev, current) => {
    const newMap: number[] = [...prev]
    newMap[current] += 1
    return newMap
  }, [0,0,0,0,0,0,0])
  const highestIndex = dieMap.reduce((prev, current, index) => current > dieMap[prev] ? index : prev)
  if (dieMap[highestIndex] >= 3)
    return { chance: 1, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else if (dieMap[highestIndex] == 2)
    return { chance: .4, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else
    return { chance: .15, keepers: [] }
}
const fourOfAKindChance = (dice: number[]): { chance: number, keepers: number[] } => {
  const dieMap = dice.reduce((prev, current) => {
    const newMap = [...prev]
    newMap[current] += 1
    return newMap
  }, [0,0,0,0,0,0,0])
  const highestIndex = dieMap.reduce((prev, current, index) => current > dieMap[prev] ? index : prev)
  if (dieMap[highestIndex] >= 4)
    return { chance: 1, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else if (dieMap[highestIndex] == 3)
    return { chance: .4, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else if (dieMap[highestIndex] == 2)
    return { chance: .1, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else
    return { chance: .01, keepers: [] }
}
const fullHouseChange = (dice: number[]): { chance: number, keepers: number[] } => {
  const dieMap = dice.reduce((prev, current) => {
    const newMap = [...prev]
    newMap[current] += 1
    return newMap
  }, [0,0,0,0,0,0,0])
  if (dieMap.find(die => die == 3) != undefined && dieMap.find(die => die == 2) != undefined)
    return { chance: 1, keepers: [0,1,2,3,4] }
  else if (dieMap.filter(die => die == 2).length == 2) {
    const nonKeeper = dieMap.findIndex(die => die == 1)
    return { chance: .3, keepers: dice.map((die, index) => die != nonKeeper ? index : -1).filter(die => die != -1) }
  }
  else if (dieMap.find(die => die == 3) != -1) {
    const three = dieMap.findIndex(die => die == 3)
    return { chance: .15, keepers: dice.map((die, index) => die == three ? index : -1).filter(die => die != -1) }
  }
  else
    return { chance: .01, keepers: [] }
}
const intersection = (a: number[], b: number[]): number[] => a.filter(num => b.includes(num))
const smallStraightChance = (dice: number[]): { chance: number, keepers: number[] } => {
  const longestRun = [[1,2,3,4], [2,3,4,5], [3,4,5,6]]
    .map(run => intersection(run, dice))
    .reduce((prev, current) => current.length > prev.length ? current : prev)
  if (longestRun.length >= 4)
    return { chance: 1, keepers: longestRun.map(item => dice.findIndex(die => item == die))}
  else if (longestRun.length == 3)
    return { chance: .3, keepers: longestRun.map(item => dice.findIndex(die => item == die))}
  else
    return { chance: .01, keepers: []}
}
const largeStraightChance = (dice: number[]): { chance: number, keepers: number[] } => {
  const longestRun = [[1,2,3,4,5], [2,3,4,5,6]]
    .map(run => intersection(run, dice))
    .reduce((prev, current) => current.length > prev.length ? current : prev)
  if (longestRun.length == 5)
    return { chance: 1, keepers: longestRun.map(item => dice.findIndex(die => item == die))}
  else if (longestRun.length == 4)
    return { chance: .15, keepers: longestRun.map(item => dice.findIndex(die => item == die))}
  else
    return { chance: .01, keepers: []}
}
const yahtzeeChance = (dice: number[]): { chance: number, keepers: number[] } => {
  const dieMap = dice.reduce((prev, current) => {
    const newMap: number[] = [...prev]
    newMap[current] += 1
    return newMap
  }, [0,0,0,0,0,0,0])
  const highestIndex = dieMap.reduce((prev, current, index) => current > dieMap[prev] ? index : prev)
  if (dieMap[highestIndex] == 5)
    return { chance: 1, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else if (dieMap[highestIndex] == 4)
    return { chance: .15, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else if (dieMap[highestIndex] == 3)
    return { chance: .01, keepers: dice.map((die, index) => die == highestIndex ? index : -1).filter(die => die != -1) }
  else
    return { chance: .01, keepers: [] }
}

const calculateChances = (dice: number[]): Record<Score, { chance: number, keepers: number[] }> => {
  return {
    ['ones']: { chance: 1, keepers: dice.filter(die => die == 1) },
    ['twos']: { chance: 1, keepers: dice.filter(die => die == 2) },
    ['threes']: { chance: 1, keepers: dice.filter(die => die == 3) },
    ['fours']: { chance: 1, keepers: dice.filter(die => die == 4) },
    ['fives']: { chance: 1, keepers: dice.filter(die => die == 5) },
    ['sixes']: { chance: 1, keepers: dice.filter(die => die == 6) },
    ['bonus']: { chance: 0, keepers: [] },
    ['3 of a kind']: threeOfAKindChance(dice),
    ['4 of a kind']: fourOfAKindChance(dice),
    ['full house']: fullHouseChange(dice),
    ['small straight']: smallStraightChance(dice),
    ['large straight']: largeStraightChance(dice),
    ['yahtzee']: yahtzeeChance(dice),
    ['chance']: { chance: 1, keepers: [] },
    ['yahtzee bonus']: { chance: 0, keepers: [] },
    ['top total']: { chance: 0, keepers: [] },
    ['bottom total']: { chance: 0, keepers: [] },
    ['grand total']: { chance: 0, keepers: [] },
  }
}

export const calculateScores = (dice: number[]): Record<Score, number> => {
  const scores = getScores(dice)
  const chances = calculateChances(dice)
  return Object.keys(chances).reduce(
    (prev, current) => ({ ...prev, [current]: Math.floor(chances[current as Score].chance) * scores[current as Score]}),
    {} as Record<Score, number>
  )
}

export const calculateBestTarget = (dice: number[]): Record<Score, { chance: number, keepers: number[] }> => {
  const chances = calculateChances(dice)
  return {
    ...chances,
    ['3 of a kind']: { chance: sum(dice) * chances['3 of a kind'].chance, keepers: chances['3 of a kind'].keepers },
    ['4 of a kind']: { chance: sum(dice) * 1.1 * chances['4 of a kind'].chance, keepers: chances['4 of a kind'].keepers },
    ['full house']: { chance: 25 * chances['full house'].chance, keepers: chances['full house'].keepers },
    ['small straight']: { chance: 30 * chances['small straight'].chance, keepers: chances['small straight'].keepers },
    ['large straight']: { chance: 40 * chances['large straight'].chance, keepers: chances['large straight'].keepers },
    ['yahtzee']: { chance: 50 * chances['yahtzee'].chance, keepers: chances['yahtzee'].keepers },
  }
}