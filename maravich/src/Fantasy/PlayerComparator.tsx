import styled from '@emotion/styled'
import { Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { spacing } from '../styles'
import { Player } from '../Utils/types'

const PlayerWrapper = styled(Paper)({
    padding: spacing.medium,
    margin: spacing.medium,
})

const PlayerField = styled(TextField)({
    minWidth: '240px'
})

interface PlayerComparatorProps {
    players: Player[]
}

export const PlayerComparator: React.FC<PlayerComparatorProps> = (props) => {
    return (
        <PlayerWrapper>
        <Autocomplete 
        options={props.players.map(player => player.firstName + ' ' + player.lastName)}
        renderInput={(params) => (
            <PlayerField {...params} label="Player" variant="outlined" />
          )}
        />
        </PlayerWrapper>
    )
}