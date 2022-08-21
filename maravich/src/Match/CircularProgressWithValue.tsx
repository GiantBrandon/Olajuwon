import { Box, CircularProgress, Typography } from '@mui/material'

type CircularProgressWithValueProps = {
    value: number
}

export const CircularProgressWithValue: React.FC<CircularProgressWithValueProps> = ({value}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress variant="determinate" value={value} />
      <Typography
        variant='caption'
        component='div'
        color='text.secondary'
        position='absolute'
      >{`${value}%`}</Typography>
    </Box>
  )
}