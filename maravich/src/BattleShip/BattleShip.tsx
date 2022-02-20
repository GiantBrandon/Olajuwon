import { Grid, Stack } from '@mui/material'
import React from 'react'
import { BattleGrid } from './BattleGrid'

export const BattleShip: React.FC = (props) => {
	const board: boolean[] = []
	for(let i = 0; i < 100; i++) {
		board.push(i % 2 == 0)
	}
	
	return (
		<Grid container>
			<Grid item xs={3}>
				<Stack spacing={1}>
					<BattleGrid board={board} />
					<BattleGrid board={board} />
					<BattleGrid board={board} />
				</Stack>
			</Grid>
			<Grid item xs={6}>
				2
			</Grid>
		</Grid>
	)
}
