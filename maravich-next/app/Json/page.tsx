'use client'

import styled from '@emotion/styled'
import { Button, ButtonGroup, Paper, Stack, TextField } from '@mui/material'
import React from 'react'
import { useJson } from './useJson'

const JsonContainer = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr min-content 1fr',
  gridTemplateColumns: '1fr 1fr',
  height: '100%'
})

const TopLeft = styled.div({ gridColumn: '1', gridRow: '1', justifyContent: 'center', margin: '16px' })
const TopRight = styled.div({ gridColumn: '2', gridRow: '1', justifyContent: 'center', margin: '16px' })
const ButtonBar = styled(ButtonGroup)({ gridRow: '2' })
const BottomLeft = styled(Paper)({ gridColumn: '1', gridRow: '3', justifyContent: 'center', margin: '16px', overflow: 'scroll' })
const BottomRight = styled(Paper)({ gridColumn: '2', gridRow: '3', justifyContent: 'center', margin: '16px', overflow: 'scroll' })

const Result = styled.pre((props: {color: string}) => ({
  margin: 0,
  backgroundColor: props.color,
  width: '100%'
}))

export default function JsonParser() {
  const { first, setFirst, second, setSecond, results, validate, format, compare } = useJson()

  return (
    <JsonContainer>
      <TopLeft>
        <TextField
          sx={{ width: '100%'}}
          multiline
          minRows={4}
          maxRows={8}
          placeholder='Enter Json'
          label='Primary Json'
          value={first}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)}
        />
      </TopLeft>
      <TopRight>
        <TextField
          sx={{ width: '100%'}}
          multiline
          minRows={4}
          maxRows={8}
          placeholder='Enter Json'
          label='Secondary Json'
          value={second}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecond(e.target.value)}
        />
      </TopRight>
      <ButtonBar variant="outlined" aria-label="outlined button group">
        <Button onClick={validate}>Validate</Button>
        <Button onClick={format}>Format</Button>
        <Button onClick={compare}>Compare</Button>
      </ButtonBar>
      {results && <>
        <BottomLeft>
          {results.map((result, index) => {
            return <Result key={index} color={result.changed ? 'green' : 'none'}>{result.first}</Result>
          })}
        </BottomLeft>
        <BottomRight>
          {results.map((result, index) => {
            return <Result key={index} color={result.changed ? 'red' : 'none'}>{result.second}</Result>
          })}
        </BottomRight>
      </>}
    </JsonContainer>
  )
}