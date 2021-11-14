const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { room } = require("./socket/room");
const { gameStart } = require("./gameStart");
const socketIo = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const rooms = [];

http.listen(4000, function () {
  console.log("server startou");
  socketIo.on("connection", function (socket) {
    room(socket, rooms, socketIo);
  });
  setInterval(() => {
    gameStart(rooms, socketIo);
  }, 100);
});
