module.exports = {
  gameStart(rooms, socket) {
    function generatesApple(room) {
      const appleX = (Math.random() * (600 - 01) + 1) | 0;
      const appleY = (Math.random() * (600 - 01) + 1) | 0;

      room.apple[0] = appleX;
      room.apple[1] = appleY;
    }

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].start === true) {
        rooms[i].users[0].move(
          rooms[i].apple[0],
          rooms[i].apple[1],
          generatesApple,
          rooms[i]
        );
        rooms[i].users[1].move(
          rooms[i].apple[0],
          rooms[i].apple[1],
          generatesApple,
          rooms[i]
        );
        socket
          .in(rooms[i].users[0].room)
          .emit("move", [rooms[i].users[0], rooms[i].users[1], rooms[i].apple]);
      }
    }
  },
};
