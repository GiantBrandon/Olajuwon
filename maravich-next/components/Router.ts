import axios from 'axios'


export const getUrl = (): string => {
  // eslint-disable-next-line  no-restricted-globals
  return location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://api.kyojin.dev:443'
}

export const getTodaysMatch = (): Promise<{ board: number[][], replacements: number[] }> =>
  axios
    .get(`${getUrl()}/v1/match`)
    .then((Response) => {
      return Response.data
    })

export const login = (name: string, pass: string): Promise<{ success: boolean }> =>
  axios
    .post(`${getUrl()}/v1/login`, { name, pass })
    .then((Response) => {
      return Response.data
    })

export const create = (name: string, pass: string): Promise<{ success: boolean }> =>
  axios
    .post(`${getUrl()}/v1/create`, { name, pass })
    .then((Response) => {
      return Response.data
    })
