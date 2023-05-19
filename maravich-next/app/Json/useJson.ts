'use client'

import { useState } from 'react'

type Result = {
    first: string,
    second: string,
    changed: boolean
  }

const pad = (count: number) => {
  return ' '.repeat(count)
}

const formatValue = (value: unknown, depth: number): string[] => {
  if (typeof value == 'number') {
    return [`${value},`]
  } else if (typeof value == 'string') {
    return [`"${value}",`]
  } else if (Array.isArray(value)) {
    return [
      '[',
      ...Object.entries(value as object)
        .flatMap(([key, value]) => formatValue(value, depth + 4))
        .map(value => `${pad(depth + 4)}${value}`),
      `${pad(depth)}],`
    ]
  } else {
    return [
      '{',
      ...Object.entries(value as object).flatMap(entry => formatJson(entry, depth + 4)),
      `${pad(depth)}},`
    ]
  }
}

const formatJson = ([key, value]: [string, unknown], depth: number) => {
  const [first, ...others] = formatValue(value, depth)
  return [`${pad(depth)}"${key}": ${first}`, ...others]
}

const formatString = (source: string): string => {
  const json = JSON.parse(source)
  return [
    '{',
    ...Object.entries(json as object).flatMap(entry => {
      return formatJson(entry, 4)
    }),
    '}'
  ].join('\n')
}

const compareValue = (key: string, first: unknown, second: unknown, depth: number): Result[] => {
  if(first == undefined) {
    const text = formatJson([key, second], depth)
    return text.map(line => { return { first: '-', second: line, changed: true } })
  }
  else if(second == undefined) {
    const text = formatJson([key, first], depth)
    return text.map(line => { return { first: line, second: '-', changed: true } })
  }
  else if (typeof first !== 'object' || typeof second !== 'object') {
    const firstString = formatJson([key, first], depth)
    const secondString = formatJson([key, second], depth)
    return [{
      first: firstString[0],
      second: secondString[0],
      changed: firstString === secondString
    }]
  } else if (Array.isArray(first) && Array.isArray(second)) {
    return [
      { first: `${pad(depth)}"${key}": [`, second: `${pad(depth)}"${key}": [`, changed: false },
      ...first.flatMap((key, index) => compareValue(key, (first as any)[index], (second as any)[index], depth + 4)),
      { first: `${pad(depth)}],`, second: `${pad(depth)}],`, changed: false }
    ]
  } else {
    const keys = [...Object.keys(first), ...Object.keys(second)]
    const uniqueKeys = keys.filter((value, index) => keys.indexOf(value) == index)
    return [
      { first: `${pad(depth)}"${key}": {`, second: `${pad(depth)}"${key}": {`, changed: false },
      ...uniqueKeys.flatMap((key) => compareValue(key, (first as any)[key], (second as any)[key], depth + 4)),
      { first: `${pad(depth)}},`, second: `${pad(depth)}},`, changed: false }
    ]
  }
}

const compareJson = (
  first: Record<string, unknown>,
  second: Record<string, unknown>
): Result[] => {
  const keys = [...Object.keys(first), ...Object.keys(second)]
  const uniqueKeys = keys.filter((value, index) => keys.indexOf(value) == index)
  return [
    { first: '{', second: '{', changed: false },
    ...uniqueKeys.flatMap((key) => compareValue(key, first[key], second[key], 4)),
    { first: '}', second: '}', changed: false }
  ]
}

export const useJson = () => {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [results, setResults] = useState<Result[]>([])
  
  const validate = () => {
    first && JSON.parse(first)
    second && JSON.parse(second)
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

  return { first, setFirst, second, setSecond, results, validate, format, compare }
}