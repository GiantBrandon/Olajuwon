'use client'

import { Search } from '@mui/icons-material'
import { Card, CardContent, Divider, FormControl, Input, InputAdornment, InputLabel, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const tables = [
  ['Brandon Kurtz', 'Alison Reikher'],
  ['Marianna Reikher', 'Alex Reikher', 'Kristine Kurtz', 'Kelly Kurtz'],
  ['Lorem Ipsum', 'Dolor Sit', 'Amet Consectetur', 'Adipiscing Elit'],
  ['Sed Do', 'Eiusmod Tempor', 'Incididunt Ut', 'Labore Et']
]

export const SeatingChart: React.FC = () => {
  const [search, setSearch] = useState('')
  const filteredTables = tables.filter(table => table.find(name => name.includes(search)))
  
  return (
    <Stack direction='column' alignItems='center' gap={2}>
      <FormControl sx={{ marginTop: 2}}>
        <InputLabel>Search</InputLabel>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          startAdornment={<InputAdornment position='start'><Search /></InputAdornment>}
        />
      </FormControl>
      <Divider>Example Data</Divider>
      <Stack direction='row' flexWrap='wrap' gap={2} justifyContent='space-around'>
        {filteredTables.map((table, index) => 
          <Card key={index} sx={{ marginBottom: '4px', width: '240px', textAlign: 'center' }}>
            <CardContent>
              <Typography>Table: {index + 1}</Typography>
              {table.map(name => <Typography key={name} sx={name.includes(search) && search != '' ? { backgroundColor: 'primary.light'} : {}}>{name}</Typography>)}
            </CardContent>
          </Card>)
        }
      </Stack>
    </Stack>
  )
}
