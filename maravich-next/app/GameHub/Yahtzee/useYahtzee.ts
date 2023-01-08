import { useEffect, useState } from 'react'
import { calculateBestTarget, calculateScores } from './helpers'
import { Player, Score, Scores } from './types'
import { useDice } from './useDice'

const top: Score[] = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']

const maxScores: Record<Score, number> = {
  ones: 5,
  twos: 10,
  threes: 15,
  fours: 20,
  fives: 25,
  sixes: 30,
  bonus: 0,
  'top total': 0,
  '3 of a kind': 30,
  '4 of a kind': 30,
  'full house': 25,
  'small straight': 30,
  'large straight': 40,
  'yahtzee': 50,
  'yahtzee bonus': 1000,
  chance: 30,
  'bottom total': 0,
  'grand total': 0,
}

const newPlayer = (name: string): Player => {
  return {
    name,
    scores: {
      ...Scores.reduce((prev, current) => ({ ...prev, [current]: undefined }), {} as Record<Score, number | undefined>),
      ['bonus']: 0,
      ['top total']: 0,
      ['bottom total']: 0,
      ['grand total']: 0,
    }
  }
}

export const useYahtzee = () => {
  const { dice, selected, resetDice, roll, setSelected } = useDice()
  const [state, setState] = useState<'rolling' | 'determining' | 'ready'>('ready')
  const [players, setPlayers] = useState<Player[]>([newPlayer('👤'), newPlayer('🤖')])
  const [turn, setTurn] = useState(0)
  const [rolls, setRolls] = useState(3)

  const determineSelection = () => {
    const best = Object.entries(calculateBestTarget(dice))
      .reduce(([a, maxValue], [b, currentValue]) => {
        return (players[turn].scores[b as Score] == undefined && currentValue.chance > maxValue.chance) ? [b, currentValue] : [a, maxValue]
      })
    const newSelection = [false, false, false, false, false]
    best[1].keepers.forEach(selection => newSelection[selection] = true)
    setSelected(newSelection)
  }

  const selectScore = () => {
    const [maxScore] = Object.entries(calculateScores(dice))
      .filter(([score]) => players[turn].scores[score as Score] == undefined)
      .reduce(([maxScore, maxValue], [currentScore, currentValue]) => {
        const maxProportion = maxValue / maxScores[maxScore as Score]
        const currentProportion = currentValue / maxScores[currentScore as Score]
        return (currentProportion >= maxProportion) ? [currentScore, currentValue] : [maxScore, maxValue]
      })
    setScore(maxScore as Score)
  }

  useEffect(() => {
    if (turn == 0)
      return
    if (state == 'ready') {
      if (rolls > 0) {
        setTimeout(() => {
          setState('rolling')
          setTimeout(() => {
            roll()
            setRolls(rolls => rolls - 1)
            setState('determining')
          }, 500)
        }, 2000)
      } else {
        setTimeout(() => {
          selectScore()
        }, 2000)
      }
    }
    else if (state == 'determining') {
      determineSelection()
      setState('ready')
    }
  }, [turn, state])

  const setScore = (score: Score) => {
    const player = players[turn]
    if(player.scores[score] != undefined)
      return
    const scores = calculateScores(dice)
    players[turn].scores = {
      ...player.scores,
      [score]: scores[score],
      'top total': player.scores['top total']!! + (top.includes(score) ? scores[score] : 0),
      'bottom total': player.scores['bottom total']!! + (top.includes(score) ? 0 : scores[score]),
      'grand total': player.scores['grand total']!! + scores[score]
    }
    setPlayers(players)
    setRolls(3)
    resetDice()
    setSelected([false, false, false, false, false])
    setTurn(turn == players.length - 1 ? 0 : turn + 1)
  }

  const rollYahtzee = () => {
    setRolls(rolls - 1)
    setState('rolling')
    setTimeout(() => {
      roll()
      setState('ready')
    }, 500)
  }

  return { players, setPlayers, dice, rollYahtzee, rolls, selected, setSelected, state, scores: calculateScores(dice), turn, setScore }
}