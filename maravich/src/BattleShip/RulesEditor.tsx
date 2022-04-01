import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { socket } from './BattleShip'
import { BattleshipFireType, BattleshipFireTypes, BattleshipFleetType, BattleshipFleetTypes, BattleshipRules, fireTypeDescriptions } from './types'

type RulesEditorProps = {
    open: boolean
    handleClose: () => void
    rules: BattleshipRules
}

export const RulesEditor: React.FC<RulesEditorProps> = ({open, handleClose, rules}) => {
  const [newRules, setNewRules] = useState(rules)

  const changeShipType = (event: SelectChangeEvent) => {
    setNewRules({...rules, shipType: event.target.value as BattleshipFleetType})
  }

  const changeFireType = (event: SelectChangeEvent) => {
    setNewRules({...rules, fireType: event.target.value as BattleshipFireType})
  }

  const submit = () => {
    console.log(rules)
    socket.send(JSON.stringify({rules: newRules, command: 'UPDATE_RULES'}))
    handleClose()
  }

    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
            <h3>Fleet Type</h3>
          <DialogContentText>
            Determines the size and shape of your fleet.
          </DialogContentText>
          <Select
            value={newRules.shipType}
            onChange={changeShipType}
          >
            {BattleshipFleetTypes.map((fleetType) => <MenuItem key={fleetType} value={fleetType}>{fleetType}</MenuItem>)}
          </Select>

            <h3>Fire Type</h3>
          <DialogContentText>
            {newRules.fireType}: {fireTypeDescriptions(newRules.fireType)}
          </DialogContentText>
          <Select
            value={newRules.fireType}
            onChange={changeFireType}
          >
            {BattleshipFireTypes.map((fireType) => <MenuItem key={fireType} value={fireType}>{fireType}</MenuItem>)}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Save</Button>
        </DialogActions>
      </Dialog>
}