import React, { useEffect, useState } from "react";
import { useSocketContext } from "./context/SocketContext";

import { useHistory } from "react-router-dom";

function App() {
  const [, setResponse] = useState("");
  const [rooms, setRooms] = useState([]);
  const [myRoom, setMyRoom] = useState(null);
  const { socketIo } = useSocketContext();
  const [name, setName] = useState("");

  const history = useHistory();

  useEffect(() => {
    socketIo.on("FromAPI", (data) => {
      setResponse(data);
    });
    socketIo.on("roomCreated", (data) => {
      setRooms(data);
    });
    socketIo.on("rooms", (data) => {
      setRooms(data);
    });
    socketIo.on("roomJoined", (data) => {
      setMyRoom(data);
      history.push(`/room/${data.id}`);
    });
  });

  function createRoom() {
    socketIo.emit("createRoom", {
      name,
    });
  }

  function joinRoom(room) {
    socketIo.emit("joinRoom", { id: room, name });
  }

  return (
    !myRoom && (
      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder={"Name"}
          value={name}
        ></input>
        <button onClick={createRoom}>Create new room</button>
        <br />s dsadsads
        {rooms.map((room) => (
          <button key={room.id} onClick={() => joinRoom(room.id)}>
            {room.id}
          </button>
        ))}
      </div>
    )
  );
}

export default App;
