import styled from '@emotion/styled'
import { Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { getFantasy } from '../Api/Router'
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
    const [selectedPlayer, setSelectedPlayer] = useState<Player>()
    const [playerStats, setPlayerStats] = useState<any[]>()
    console.log(playerStats)

    const changePlayer = (_, value) => {
        setSelectedPlayer(value)
    }

    useEffect(() => {
        selectedPlayer ? getFantasy(selectedPlayer.playerId).then(response => setPlayerStats(response.stats)) : setPlayerStats([])
    }, [selectedPlayer])

    return (
        <PlayerWrapper>
        <Autocomplete 
        options={props.players}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
        onChange={changePlayer}
        renderInput={(params) => (
            <PlayerField {...params} value="Player" variant="outlined" />
          )}
        />
        </PlayerWrapper>
    )
}