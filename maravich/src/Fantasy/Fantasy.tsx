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
	minWidth: '240px',
})

export const Fantasy: React.FC = (props) => {
	const [players, setPlayers] = useState<Player[]>([])
	const [selectedPlayers, setSelectedPlayers] = useState<(Stats | undefined)[]>(
		[undefined, undefined, undefined]
	)
	console.log(players)
	console.log(selectedPlayers)

	useEffect(() => {
		getPlayers().then((response) => setPlayers(response.players))
	}, [])

	const changePlayer = (index: number, value?: Player) => {
		getRecentGames(value!!.playerId).then((response) => {
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
						getOptionLabel={(option) =>
							option.firstName + ' ' + option.lastName
						}
						onChange={(_, value) => changePlayer(0, value!!)}
						renderInput={(params) => (
							<PlayerField {...params} value="Player" variant="outlined" />
						)}
					/>
                    {selectedPlayers[0] &&
                    <>
                    <p> Points: {selectedPlayers[0].points}</p>
                    <p> Rebounds: {selectedPlayers[0].totReb}</p>
                    <p> Assists: {selectedPlayers[0].assists}</p>
                    <p> Blocks: {selectedPlayers[0].blocks}</p>
                    <p> Steals: {selectedPlayers[0].steals}</p>
                    <p> Field Goal %: {selectedPlayers[0].fgp}</p>
                    <p> 3 Point %: {selectedPlayers[0].tpp}</p>
                    <p> Free Throw %: {selectedPlayers[0].ftp}</p>
                    </>}
				</PlayerWrapper>
				<PlayerWrapper>
					<Autocomplete
						options={players}
						getOptionLabel={(option) =>
							option.firstName + ' ' + option.lastName
						}
						onChange={(_, value) => changePlayer(1, value!!)}
						renderInput={(params) => (
							<PlayerField {...params} value="Player" variant="outlined" />
						)}
					/>
                    {selectedPlayers[1] &&
                    <>
                    <p> Points: {selectedPlayers[1].points}</p>
                    <p> Rebounds: {selectedPlayers[1].totReb}</p>
                    <p> Assists: {selectedPlayers[1].assists}</p>
                    <p> Blocks: {selectedPlayers[1].blocks}</p>
                    <p> Steals: {selectedPlayers[1].steals}</p>
                    <p> Field Goal %: {selectedPlayers[1].fgp}</p>
                    <p> 3 Point %: {selectedPlayers[1].tpp}</p>
                    <p> Free Throw %: {selectedPlayers[1].ftp}</p>
                    </>}
				</PlayerWrapper>
				<PlayerWrapper>
					<Autocomplete
						options={players}
						getOptionLabel={(option) =>
							option.firstName + ' ' + option.lastName
						}
						onChange={(_, value) => changePlayer(2, value!!)}
						renderInput={(params) => (
							<PlayerField {...params} value="Player" variant="outlined" />
						)}
					/>
                    {selectedPlayers[2] &&
                    <>
                    <p> Points: {selectedPlayers[2].points}</p>
                    <p> Rebounds: {selectedPlayers[2].totReb}</p>
                    <p> Assists: {selectedPlayers[2].assists}</p>
                    <p> Blocks: {selectedPlayers[2].blocks}</p>
                    <p> Steals: {selectedPlayers[2].steals}</p>
                    <p> Field Goal %: {selectedPlayers[2].fgp}</p>
                    <p> 3 Point %: {selectedPlayers[2].tpp}</p>
                    <p> Free Throw %: {selectedPlayers[2].ftp}</p>
                    </>}
				</PlayerWrapper>
			</Grid>
		</CenteredDiv>
	)
}
