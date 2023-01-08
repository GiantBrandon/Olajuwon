import { useState } from 'react'

export const getNewDice = (dice: number[], selected: boolean[]) => {
  return dice.map((die, index) => selected[index] ? die : Math.floor(Math.random() * 6) + 1)
}

export const useDice = () => {
  const [dice, setDice] = useState<number[]>([1,1,1,1,1])
  const [selected, setSelected] = useState<boolean[]>([false, false, false, false, false])

  const resetDice = () => {
    setDice([1,1,1,1,1])
  }

  const roll = () => {
    setDice(getNewDice(dice, selected))
  }

  return { dice, selected, setSelected, resetDice, roll }
}