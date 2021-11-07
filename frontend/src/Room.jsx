import { useState, useEffect } from 'react';

// import { useParams } from 'react-router-dom';
import { useSocketContext } from "./context/SocketContext";


function Room() {
    const { socketIo } = useSocketContext();
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState([]);

    // const params = useParams();
    // const roomId = params.roomId;


    useEffect(() => {
        socketIo.on("message", (data) => {
            setMessages(messages => [...messages, data]);
        });
    }, [socketIo]);

    return (<div>
        <input onChange={(e) => setValue(e.target.value)}></input>
        <button onClick={() => socketIo.emit("sendMessage", value)}>Enviar</button>
        <div>
            {messages.map((message, index) => {
                return (<div key={index}>{message}</div>)
            })}
        </div>
    </div>)
}

export default Room;