const { user, room } = require("../models");
const { chat } = require("./chat");

module.exports = {
  room(socket, rooms, socketIo) {
    socket.on("createRoom", function (data) {
      if (rooms.find((room) => room.id === socket.id)) return;
      const myRoom = room("room-" + socket.id, data.name);
      saveUser(socket, data, myRoom);

      rooms.push(myRoom);
      socket.join(myRoom.id);
      socketIo.in(myRoom.id).emit("roomJoined", myRoom);
      chat(socket, rooms, socketIo);
    });

    socket.on("joinRoom", async function (data) {
      const room = rooms.find((room) => room.id === data.id);
      if (!room) return;
      socket.join(room.id);
      saveUser(socket, data, room);
      socketIo.in(room.id).emit("roomJoined", room);
      chat(socket, rooms, socketIo);
    });

    function saveUser(socket, data, room) {
      const objUser = user(socket.id, data.name, room.id);
      room.users.push(objUser);
    }

    setInterval(() => {
      socket.emit("rooms", rooms);
    }, 1000);
  },
};
