import styled from "@emotion/styled"
import { Grid, Paper } from "@mui/material"
import React from "react"

const GridWrapper = styled(Paper)({
	width: '264px',
	alignSelf: 'center'
})

const GridItem = styled(Grid)({
  height: "24px",
  width: "24px",
})

type BattleGridProps = {
  board: boolean[]
}

export const BattleGrid: React.FC<BattleGridProps> = ({ board }) => {
	
  return (
    <GridWrapper>
      <Grid container columns={10}>
        {board.map((item) => {
          return (
            <GridItem item xs={1}>
              <input type="checkbox" checked={item} />
            </GridItem>
          )
        })}
      </Grid>
    </GridWrapper>
  )
}
