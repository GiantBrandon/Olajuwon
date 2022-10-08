import styled from '@emotion/styled'
import { Button, ButtonGroup, Paper, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

const Result = styled.pre((props: {color: string}) => ({
  margin: 0,
  backgroundColor: props.color,
}))

const pad = (count: number) => {
  return ' '.repeat(count)
}

const formatValue = (key: string, value: unknown, depth: number): string[] => {
  if (typeof value == 'number') {
    return [`${pad(depth)}"${key}": ${value},`]
  } else if (typeof value == 'string') {
    return [`${pad(depth)}"${key}": "${value}",`]
  } else {
    return [
      `${pad(depth)}"${key}": {`,
      ...Object.entries(value as object).flatMap(([key, value]) => formatValue(key, value, depth + 2)),
      `${pad(depth)}},`
    ]
  }
}

const formatString = (source: string): string => {
  const json = JSON.parse(source)
  return [
    '{',
    ...Object.entries(json as object).flatMap(([key, value]) => formatValue(key, value, 2)),
    '}'
  ].join('\n')
}

const compareValue = (key: string, first: unknown, second: unknown, depth: number): Result[] => {
  if(first == undefined) {
    const text = formatValue(key, second, depth)
    return text.map(line => { return { first: '-', second: line, changed: true } })
  }
  else if(second == undefined) {
    const text = formatValue(key, first, depth)
    return text.map(line => { return { first: line, second: '-', changed: true } })
  }
  else if (typeof first !== 'object' || typeof second !== 'object') {
    const firstString = formatValue(key, first, depth)
    const secondString = formatValue(key, second, depth)
    return [{
      first: firstString[0],
      second: secondString[0],
      changed: firstString === secondString
    }]
  } else {
    const keys = [...new Set([...Object.keys(first), ...Object.keys(second)])].sort()
    return [
      { first: `${pad(depth)}"${key}": {`, second: `${pad(depth)}"${key}": {`, changed: false },
      ...keys.flatMap((key) => compareValue(key, (first as any)[key], (second as any)[key], depth + 2)),
      { first: `${pad(depth)}},`, second: `${pad(depth)}},`, changed: false }
    ]
  }
}

const compareJson = (
  first: Record<string, unknown>,
  second: Record<string, unknown>
): Result[] => {
  const keys = [...new Set([...Object.keys(first), ...Object.keys(second)])].sort()
  return [
    { first: '{', second: '{', changed: false },
    ...keys.flatMap((key) => compareValue(key, first[key], second[key], 2)),
    { first: '}', second: '}', changed: false }
  ]
}

type Result = {
  first: string,
  second: string,
  changed: boolean
}

export const JsonParser: React.FC = () => {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [results, setResults] = useState<Result[]>([])
  
  const validate = () => {
    const firstJson = JSON.parse(first)
    console.log(firstJson)
    const secondJson = JSON.parse(second)
    console.log(secondJson)
  }

  const format = () => {
    first && setFirst(formatString(first))
    second && setSecond(formatString(second))
  }

  const compare = () => {
    const firstJson = JSON.parse(first)
    const secondJson = JSON.parse(second)
    const results = compareJson(firstJson, secondJson)
    setResults(results)
  }

  return (
    <>
      <Stack direction='row' padding={2} spacing={2}>
        <TextField
          sx={{ width: '50%' }}
          multiline
          rows={16}
          placeholder='Enter Json'
          label='Primary Json'
          value={first}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)}
        />
        <TextField
          sx={{ width: '50%' }}
          multiline
          rows={16}
          placeholder='Enter Json'
          label='Secondary Json'
          value={second}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecond(e.target.value)}
        />
      </Stack>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={validate}>Validate</Button>
        <Button onClick={format}>Format</Button>
        <Button onClick={compare}>Compare</Button>
      </ButtonGroup>
      {results && <>
        <Stack direction='row' padding={2} spacing={2} width={'100%'}>
          <Paper sx={{ width: '50%', overflowX: 'scroll' }}>
            {results.map(result => {
              return <Result color={result.changed ? 'green' : 'none'}>{result.first}</Result>
            })}
          </Paper>
          <Paper sx={{ width: '50%', overflowX: 'scroll' }}>
            {results.map(result => {
              return <Result color={result.changed ? 'red' : 'none'}>{result.second}</Result>
            })}
          </Paper>
        </Stack>
      </>}
    </>
  )
}