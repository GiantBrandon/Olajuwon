export const Scores = [
  'ones',
  'twos',
  'threes',
  'fours',
  'fives',
  'sixes',
  'bonus',
  '3 of a kind',
  '4 of a kind',
  'full house',
  'small straight',
  'large straight',
  'yahtzee',
  'chance',
  'yahtzee bonus',
  'top total',
  'bottom total',
  'grand total',
] as const
export type Score = typeof Scores[number]
  
export const DieCharacters = ['0', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'] as const
  
export type Player = {
  name: string,
  scores: Record<Score, number | undefined>
}