import axios from "axios";


export const getUsers = () => axios.get('http://localhost:8080/v1/login').then(Response => console.log(Response.data))