const { getMyRoomId, getMyRoom } = require("../utils");

module.exports = {
  game(socket, rooms, socketIo) {
    socket.on("start", function () {
      const myRoomId = getMyRoomId(socket);
      const myRoom = getMyRoom(myRoomId, rooms);
      if (myRoom.start === true) return;
      if (myRoom.users.length < 2) return;
      const appleX = (Math.random() * (600 - 01) + 1) | 0;
      const appleY = (Math.random() * (600 - 01) + 1) | 0;

      myRoom.apple[0] = appleX;
      myRoom.apple[1] = appleY;

      myRoom.start = true;
      myRoom.users[0].setPosition1();
      myRoom.users[1].setPosition2();
    });

    socket.on("changeDirection", function (data) {
      const room = rooms.find((room) =>
        room.users.find((user) => user.id === socket.id)
      );
      room.users.find((user) => user.id === socket.id).changeDirection(data);
    });
  },
};
