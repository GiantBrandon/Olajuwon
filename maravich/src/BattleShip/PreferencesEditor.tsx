import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import { socket } from './BattleShip'
import { BattleshipFireTypes, BattleshipFleetTypes, fireTypeDescriptions } from './types'

type PreferencesEditorProps = {
    open: boolean
    handleClose: () => void
}

const getOrDefault = (key: string, defaultString: string) => {
  const result = localStorage.getItem(key)
  return result ? result : defaultString
}

export const PreferencesEditor: React.FC<PreferencesEditorProps> = ({open, handleClose}) => {
  const [alert, setAlert] = useState(getOrDefault('alert', 'none'))

  const changeAlert = (event: SelectChangeEvent) => {
    setAlert(event.target.value)
  }

  const submit = () => {
    localStorage.setItem('alert', alert)
    handleClose()
  }

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Preferences</DialogTitle>
    <DialogContent>
      <h3>Alert Type</h3>
      <RadioGroup
        defaultValue={alert}
        value={alert}
        onChange={changeAlert}
      >
        <FormControlLabel value="none" control={<Radio />} label="none" />
        <FormControlLabel value="horn" control={<Radio />} label="horn" />
      </RadioGroup>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={submit}>Save</Button>
    </DialogActions>
  </Dialog>
}