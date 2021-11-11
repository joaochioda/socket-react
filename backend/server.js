const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { chat } = require("./chat");

const socketIo = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const rooms = [];
let users = [];

http.listen(4000, function () {
  console.log("server startou");
  socketIo.on("connection", function (socket) {
    chat(socket, users, rooms, socketIo);
  });
});
