module.exports = {
  gameStart(rooms, socket) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].start === true) {
        rooms[i].users[0].move();
        rooms[i].users[1].move();
        socket
          .in(rooms[i].users[0].room)
          .emit("move", [rooms[i].users[0], rooms[i].users[1]]);
      }
    }
  },
};
