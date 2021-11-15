module.exports = {
  getMyRoomId(socket) {
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
  },
  getMyRoom(id, rooms) {
    return rooms.find((r) => r.id === id);
  },
};
