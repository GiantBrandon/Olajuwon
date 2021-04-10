import { Grid, Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { getPlayers, getRecentGames } from '../Api/Router'
import { CenteredDiv, spacing } from '../styles'
import { Player, Stats } from '../Utils/types'

const PlayerWrapper = styled(Paper)({
    padding: spacing.medium,
    margin: spacing.medium,
})

const PlayerField = styled(TextField)({
    minWidth: '240px'
})

export const Fantasy: React.FC = (props) => {
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayers, setSelectedPlayers] = useState<(Stats | undefined)[]>([undefined, undefined, undefined])
    console.log(selectedPlayers)
    
    useEffect(() => {
        getPlayers().then(response => setPlayers(response.players))
    }, [])

    const changePlayer = (index: number, value?: Player) => {
        getRecentGames(value!!.playerId).then(response => {
            const newPlayers = [...selectedPlayers]
            newPlayers[index] = response.stats
            setSelectedPlayers(newPlayers)
        })
    }

    return (
        <CenteredDiv>
        <Grid container spacing={1}>
            <PlayerWrapper>
            <Autocomplete 
        options={players}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
        onChange={(_, value) => changePlayer(0, value!!)}
        renderInput={(params) => (
            <PlayerField {...params} value="Player" variant="outlined" />
          )}
        />
                </PlayerWrapper>
                <PlayerWrapper>
            <Autocomplete 
        options={players}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
        onChange={(_, value) => changePlayer(0, value!!)}
        renderInput={(params) => (
            <PlayerField {...params} value="Player" variant="outlined" />
          )}
        />
                </PlayerWrapper>
                <PlayerWrapper>
            <Autocomplete 
        options={players}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
        onChange={(_, value) => changePlayer(0, value!!)}
        renderInput={(params) => (
            <PlayerField {...params} value="Player" variant="outlined" />
          )}
        />
                </PlayerWrapper>
        </Grid>
        </CenteredDiv>
    )
}
