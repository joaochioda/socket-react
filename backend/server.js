const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { user, room } = require("./modules");

const socketIo = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const rooms = [];
let users = [];

function saveUser(socket, data, room) {
  const objUser = user(socket.id, data.name, room.id);

  users.push(objUser);
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

http.listen(4000, function () {
  console.log("server startou");
  socketIo.on("connection", function (socket) {
    socket.on("createRoom", function (data) {
      if (rooms.find((room) => room.id === socket.id)) return;
      const myRoom = room(socket.id, data.name);
      saveUser(socket, data, myRoom);

      myRoom.users.push(socket.id);
      rooms.push(myRoom);
      socket.join(socket.id);
      socket.emit("roomJoined", myRoom);
    });

    socket.on("joinRoom", function (data) {
      const room = rooms.find((room) => room.id === data.id);
      if (!room) return;
      socket.join(room.id);
      saveUser(socket, data, room);
      room.users.push(socket.id);
      socket.emit("roomJoined", room);
    });

    socket.on("sendMessage", function (data) {
      const user = getUser(socket.id);
      const message = `${user.name}: data`;
      socketIo.in(user.room).emit("message", message);
    });

    setInterval(() => {
      socket.emit("rooms", rooms);
    }, 1000);
  });
});
