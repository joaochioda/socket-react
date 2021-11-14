import { useState, useEffect } from 'react';

// import { useParams } from 'react-router-dom';
import { useSocketContext } from "./context/SocketContext";
import { useHistory } from "react-router-dom";
import Canvas from './Canvas';
import draw from './Draw';

function Room() {
    const { socketIo } = useSocketContext();
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState([]);
    const history = useHistory();
    const [users, setUsers] = useState([]);
    // const params = useParams();
    // const roomId = params.roomId;

    useEffect(() => {
        socketIo.on("message", (data) => {
            setMessages(messages => [...messages, data]);
        });
        socketIo.on("move", (data) => {
            setUsers(data)
        })

    }, [socketIo]);

    function handleKeyDown(key) {
        socketIo.emit("changeDirection", key)
    }

    function handleEnterDown(key) {
        if (key === 'Enter') socketIo.emit("sendMessage", value)
    }

    return (<div>
        <button onClick={() => history.push('/')}>Voltar</button>
        <input onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => handleEnterDown(e.key)}></input>
        <button onClick={() => socketIo.emit("sendMessage", value)}>Enviar</button>
        <button
            //disabled={users.length !== 2} 
            onClick={() => socketIo.emit("start")}>Start</button>

        <div>
            {messages.map((message, index) => {
                return (<div key={index}>{message}</div>)
            })}
        </div>

        <Canvas draw={draw} users={users} handleKeyDown={handleKeyDown} />
    </div>)
}

export default Room;