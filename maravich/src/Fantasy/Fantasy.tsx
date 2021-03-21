import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getPlayers } from '../Api/Router'
import { CenteredDiv } from '../styles'
import { Player } from '../Utils/types'
import { PlayerComparator } from './PlayerComparator'

export const Fantasy: React.FC = (props) => {
    const [players, setPlayers] = useState<Player[]>([])
    
    useEffect(() => {
        getPlayers().then(response => setPlayers(response.players))
    }, [])

    return (
        <CenteredDiv>
        <Grid container spacing={1}>
            <PlayerComparator players={players} />
            <PlayerComparator players={players} />
            <PlayerComparator players={players} />
        </Grid>
        </CenteredDiv>
    )
}
