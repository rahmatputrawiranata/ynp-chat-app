import { BASE_URL } from ".";
import {io} from "socket.io-client"
export const socket = io(BASE_URL, {
    query: {
        token: localStorage.getItem('access_token')
    }
})