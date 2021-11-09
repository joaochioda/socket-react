import React, { useEffect, useState } from "react";
import { useSocketContext } from "./context/SocketContext";

import { useHistory } from "react-router-dom";

import "./styles.css";

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
        <div style={{ display: "flex" }}>
          <div class="input-wrapper">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder={"Name"}
              value={name}
              className="input"
            ></input>
            <span class="underline"></span>
          </div>

          <button
            className="bn632-hover bn26"
            onClick={createRoom}
            disabled={name.length < 1}
          >
            Create new room
          </button>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          {rooms.map((room) => (
            <button
              className="bn632-hover bn26 color"
              key={room.id}
              onClick={() => joinRoom(room.id)}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>
    )
  );
}

export default App;
