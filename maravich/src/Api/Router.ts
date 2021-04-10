import axios from "axios";
import { Player, Stats } from "../Utils/types";


export const getUsers = () => axios.get('http://3.143.226.28:8080/v1/login').then(Response => console.log(Response.data))

export const getLinkedin = () => axios.get('http://3.143.226.28:8080/v1/linkedin').then(Response => console.log(Response.data))

export const getRecentGames = (id: number): Promise<{stats: Stats}> => axios.get(`http://3.143.226.28:8080/v1/recentgames/${id}`).then(Response => Response.data)

export const getPlayers = (): Promise<{players: Player[]}> => axios.get<{players: Player[]}>('http://3.143.226.28:8080/v1/players').then(Response => Response.data)