import { ReactElement, createContext, useContext, useMemo } from "react";
import io, { Socket } from "socket.io-client";


const SocketContext = createContext<Socket|null|undefined>(undefined);

const getSocket = () => useContext!(SocketContext);

const SocketProvider = ({children}:{children:ReactElement}) => {
    const socket = useMemo(() => io("https://chat-app-backend-urlw.onrender.com", {withCredentials:true}), []);

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider, getSocket};