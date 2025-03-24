import socket from "./socket"

const services = {
    socketInst: null,

    init: () => {
        services.socketInst = socket.init()
    }
}

export default services