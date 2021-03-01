import React from 'react'
import { Popup } from '../Popup'
import { PasswordEntry } from './PasswordEntry'

export const Login: React.FC = (props) => {
    return (
      <>
        <Popup>
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
          </Popup>
          </>
    )
}