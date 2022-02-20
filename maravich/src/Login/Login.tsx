import styled from '@emotion/styled'
import { Button, Checkbox, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, TextField } from '@mui/material'
import { TextFields, Dialpad, VisibilityOff, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'
import { CenteredDiv, spacing } from '../styles'
import { PasswordEntry } from './PasswordEntry'

const LoginWrapper = styled(Paper)({
  padding: spacing.medium,
  display: 'flex',
  flexDirection: 'column',
})

const UsernameField = styled(TextField)({
  marginBottom: '8px'
})

const SubmitButton = styled(Button)({
  marginTop: '8px'
})

export const Login: React.FC = (props) => {
  const [usePasscode, setUsePasscode] = useState(true)
  const [hidePassword, setHidePassword] = useState(true)
    return (
      <CenteredDiv>
          <LoginWrapper>
          <UsernameField label="Username" />
          <div></div>
          {usePasscode ? <PasswordEntry /> :
          <FormControl>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={hidePassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setHidePassword(!hidePassword)}
                >
                  {hidePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>}
          <Grid><SubmitButton variant="contained" color="primary" onClick={() => alert('ya, so this doesn\'t do anything yet')}>
            Submit
          </SubmitButton>
          <Checkbox checked={usePasscode} icon={<TextFields />} checkedIcon={<Dialpad />} onChange={() => setUsePasscode(!usePasscode)} />
          </Grid>
          </LoginWrapper>
          </CenteredDiv>
    )
}