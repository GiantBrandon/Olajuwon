import { Autocomplete, Box, TextField } from '@mui/material'
import { Player, allPlayers } from './players'

type PlayerSelectorProps = {
    players: Player[],
    setPlayers: (players: Player[]) => void
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({ players, setPlayers }) => {
  return (
    <></>
  )
}