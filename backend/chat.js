const { game } = require("./game");
module.exports = {
  chat(socket, rooms, socketIo) {
    function getUser(id, myRoom) {
      return myRoom.users.find((user) => user.id === id);
    }

    socket.on("sendMessage", function (data) {
      const arr = Array.from(socket.adapter.rooms);
      const filtered = arr.filter((room) => !room[1].has(room[0]));
      const room = filtered.map((i) => i[0])[0];

      const myRoom = rooms.find((r) => r.id === room);

      const user = getUser(socket.id, myRoom);
      const message = `${user.name}: ${data}`;
      socketIo.in(user.room).emit("message", message);
    });

    // game(socket, rooms, socketIo);
  },
};
