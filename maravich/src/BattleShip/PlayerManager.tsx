import { Delete } from '@mui/icons-material'
import { Dialog, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import { SocketContext } from './BattleShip'
import { BattleshipGame, BattleshipPlayer } from './types'

type PlayerManagerProps = {
  game: BattleshipGame
    open: boolean
    handleClose: () => void
}

export const PlayerManager: React.FC<PlayerManagerProps> = ({game, open, handleClose}) => {
  const { sendMessage } = useContext(SocketContext)

  const renderPlayer = (player: BattleshipPlayer) => {
    return <TableRow>
      <TableCell>
        {player.name}
      </TableCell>
      <TableCell>
        {player.shipCount}
      </TableCell>
      <TableCell>
        <Delete onClick={() => sendMessage(game.self.name, 'REMOVE_PLAYER', {toDelete: player.name})}/>
      </TableCell>
    </TableRow>
  }

  return <Dialog open={open} onClose={handleClose}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Player
          </TableCell>
          <TableCell>
            Ships
          </TableCell>
          <TableCell>
            Delete
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderPlayer(game.self)}
        {game.others.map(other => renderPlayer(other))}
      </TableBody>
    </Table>
  </Dialog>
}