import axios from "axios";
import { Player } from "../Utils/types";


export const getUsers = () => axios.get('http://localhost:8080/v1/login').then(Response => console.log(Response.data))

export const getLinkedin = () => axios.get('http://localhost:8080/v1/linkedin').then(Response => console.log(Response.data))

export const getFantasy = (id: number) => axios.get(`http://localhost:8080/v1/fantasy/${id}`).then(Response => console.log(Response.data))

export const getPlayers = (): Promise<{players: Player[]}> => axios.get<{players: Player[]}>('http://3.140.249.39:8080/v1/players').then(Response => Response.data)