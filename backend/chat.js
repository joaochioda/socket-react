const { user, room } = require("./models");
const { game } = require("./game");
module.exports = {
  chat(socket, users, rooms, socketIo) {
    function saveUser(socket, data, room) {
      const objUser = user(socket.id, data.name, room.id);
      users.push(objUser);
    }

    function getUser(id) {
      return users.find((user) => user.id === id);
    }

    function getAllWithRoom(roomId) {
      return users.filter((user) => user.room === roomId);
    }

    socket.on("createRoom", function (data) {
      if (rooms.find((room) => room.id === socket.id)) return;
      const myRoom = room(socket.id, data.name);
      saveUser(socket, data, myRoom);

      myRoom.users.push(socket.id);
      rooms.push(myRoom);
      socket.join(socket.id);
      socket.emit("roomJoined", myRoom);
    });

    socket.on("joinRoom", async function (data) {
      const room = rooms.find((room) => room.id === data.id);
      if (!room) return;
      socket.join(room.id);
      saveUser(socket, data, room);
      room.users.push(socket.id);
      socketIo.emit("roomJoined", room);
    });

    socket.on("sendMessage", function (data) {
      const user = getUser(socket.id);
      const message = `${user.name}: ${data}`;
      socketIo.in(user.room).emit("message", message);
    });

    socket.on("start", function () {
      const user = getUser(socket.id);
      const usersInRoom = getAllWithRoom(user.room);
      game(socket, usersInRoom, socketIo);
    });

    setInterval(() => {
      socket.emit("rooms", rooms);
    }, 1000);
  },
};
