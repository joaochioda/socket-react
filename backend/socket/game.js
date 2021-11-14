module.exports = {
  game(socket, rooms, socketIo) {
    function getMyRoomId() {
      const arr = Array.from(socket.adapter.rooms);
      const filtered = arr.filter((room) => !room[1].has(room[0]));

      return filtered
        .map((f) => {
          let array = [...f[1]];
          if (array.find((i) => i === socket.id)) {
            return f[0];
          }
        })
        .filter((i) => i)[0];
    }

    function getMyRoom(id) {
      return rooms.find((r) => r.id === id);
    }

    socket.on("start", function () {
      const myRoomId = getMyRoomId();
      const myRoom = getMyRoom(myRoomId);
      if (myRoom.start === true) return;
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
