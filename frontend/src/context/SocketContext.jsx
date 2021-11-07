import { React, createContext, useContext } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";
const socketIo = socketIOClient(ENDPOINT);

export const SocketContext = createContext({});

export function SocketContextProvider({ children }) {

    return (
        <SocketContext.Provider value={{ socketIo }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocketContext = () => useContext(SocketContext);
