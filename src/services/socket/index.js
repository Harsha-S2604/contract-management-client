import { io } from "socket.io-client"

const socket = {
    init: () => {
        const socket = io("http://localhost:3000")
        socket.on("connect", () => {
            console.log("connected to the server")
        })

        return socket
    }
}

export default socket