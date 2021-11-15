const { game } = require("./game");
const { getMyRoomId, getMyRoom } = require("../utils");

module.exports = {
  chat(socket, rooms, socketIo) {
    function getUser(id, myRoom) {
      return myRoom.users.find((user) => user.id === id);
    }

    socket.on("sendMessage", function (data) {
      const myRoomId = getMyRoomId(socket);
      const myRoom = getMyRoom(myRoomId, rooms);
      const user = getUser(socket.id, myRoom);

      const message = `${user.name}: ${data}`;
      socketIo.in(user.room).emit("message", message);
    });

    game(socket, rooms, socketIo);
  },
};
