import axios from "axios"
import { Player, Stats } from "../Utils/types"


export const getUrl = (): string => {
  // eslint-disable-next-line  no-restricted-globals
  return location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://api.kyojin.dev:443"
}

export const getUsers = () =>
  axios
    .get(`${getUrl()}/v1/login`)
    .then((Response) => console.log(Response.data))

export const getLinkedin = () =>
  axios
    .get(`${getUrl()}/v1/linkedin`)
    .then((Response) => console.log(Response.data))

export const getRecentGames = (id: number): Promise<{ stats: Stats }> =>
  axios
    .get(`${getUrl()}/v1/recentgames/${id}`)
    .then((Response) => Response.data)

export const getPlayers = (): Promise<{ players: Player[] }> =>
  axios
    .get<{ players: Player[] }>(`${getUrl()}/v1/players`)
    .then((Response) => Response.data)
    
export const getBoard = (): Promise<{ board: boolean[] }> =>
  axios
    .get(`${getUrl()}/v1/boards`)
    .then((Response) => {
      console.log(Response)
      return Response.data
    })
