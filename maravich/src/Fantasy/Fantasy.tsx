import { Grid, Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { getPlayers, getRecentGames } from '../Api/Router'
import { CenteredDiv, spacing } from '../styles'
import { Player, Stats } from '../Utils/types'
import { PlayerStats } from './PlayerStats'

const PlayerWrapper = styled(Paper)({
	padding: spacing.medium,
	margin: spacing.medium,
})

const PlayerField = styled(TextField)({
	minWidth: '240px',
})

const emptyStats: Stats = {
	assists: -1,
blocks: -1,
defReb: -1,
fga: -1,
fgm: -1,
fgp: -1,
fta: -1,
ftm: -1,
ftp: -1,
min: -1,
offReb: -1,
pFouls: -1,
playerId: -1,
plusMinus: -1,
points: -1,
steals: -1,
teamId: -1,
totReb: -1,
tpa: -1,
tpm: -1,
tpp: -1,
turnovers: -1,
}

export const Fantasy: React.FC = (props) => {
	const [players, setPlayers] = useState<Player[]>([])
	const [selectedPlayers, setSelectedPlayers] = useState<(Stats | undefined)[]>(
		[undefined, undefined, undefined]
	)
	const [highStats, setHighStats] = useState<Stats>(emptyStats)
	const [lowStats, setLowStats] = useState<Stats>(emptyStats)
	console.log(players)
	console.log(selectedPlayers)
	console.log(highStats, lowStats)

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

	useEffect(() => {
		const newHighStats = {...highStats}
		const newLowStats = {...lowStats}
		const validPlayers = selectedPlayers.filter(player => player != undefined) as Stats[]
			validPlayers.forEach(player => {
				Object.keys(player).forEach(key => {
				if(newHighStats[key] == -1 || newHighStats[key] < player[key]) newHighStats[key] = player[key]
				if(newLowStats[key] == -1 || newLowStats[key] > player[key]) newLowStats[key] = player[key]
			})
		})
		setHighStats(newHighStats)
		setLowStats(newLowStats)
	}, [selectedPlayers])

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
                    {selectedPlayers[0] && <PlayerStats player={selectedPlayers[0]} low={lowStats} high={highStats} />}
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
                    
                    {selectedPlayers[1] && <PlayerStats player={selectedPlayers[1]} low={lowStats} high={highStats} />}
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
                    
                    {selectedPlayers[2] && <PlayerStats player={selectedPlayers[2]} low={lowStats} high={highStats} />}
				</PlayerWrapper>
			</Grid>
		</CenteredDiv>
	)
}
