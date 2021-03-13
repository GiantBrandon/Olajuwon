import styled from '@emotion/styled'
import { Paper } from '@material-ui/core'
import React from 'react'
import { CenteredDiv, spacing } from '../styles'
import { PasswordEntry } from './PasswordEntry'

const LoginWrapper = styled(Paper)({
  padding: spacing.medium
})

export const Login: React.FC = (props) => {
    return (
      <CenteredDiv>
          <LoginWrapper>
          <p>
            Username:
          </p>
          <input />
          <p>
            Password:
          </p>
          <PasswordEntry />
          <button onClick={() => alert('ya, so this doesn\'t do anything yet')}>
            Submit
          </button>
          </LoginWrapper>
          </CenteredDiv>
    )
}