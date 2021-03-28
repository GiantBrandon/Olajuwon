import axios from "axios";
import { Player } from "../Utils/types";


export const getUsers = () => axios.get('http://localhost:8080/v1/login').then(Response => console.log(Response.data))

export const getLinkedin = () => axios.get('http://localhost:8080/v1/linkedin').then(Response => console.log(Response.data))

export const getFantasy = (id: number): Promise<{stats: any[]}> => axios.get(`http://localhost:8080/v1/recentgames/${id}`).then(Response => Response.data)

export const getPlayers = (): Promise<{players: Player[]}> => axios.get<{players: Player[]}>('http://localhost:8080/v1/players').then(Response => Response.data)