import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React from 'react'

const GridItem = styled(Grid)({
	height: '24px',
	width: '24px'
})

type BattleGridProps = {
	board: boolean[]
}

export const BattleGrid: React.FC<BattleGridProps> = ({board}) => {
	return (
		<Grid container columns={10} width={240}>
			{board.map(item => {
				return <GridItem item>
					<input type='checkbox' checked={item} />
					</GridItem>
})}
		</Grid>
	)
}
