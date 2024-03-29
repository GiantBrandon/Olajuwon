import { ButtonBase, Grid, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import React, { ReactElement } from 'react'

type GameInfoProps = {
  href: string
    icon: ReactElement
    title: string
    description: string
}

export const GameInfo: React.FC<GameInfoProps> = ({ href, icon, title, description }) => {
  return (
    <Link href={href}>
      <ButtonBase>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
          }}
          elevation={2}
        >
          <Grid container spacing={2} width={300}>
            <Grid item>
              {icon}
            </Grid>
            <Grid item xs sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography noWrap gutterBottom variant="h5">
                    {title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
    </Link>
  )
}