module.exports = {
  game(socket, rooms, socketIo) {
    let stateRoom = [];
    socket.on("start", function () {
      // const arr = Array.from(socket.adapter.rooms);
      // const filtered = arr.filter((room) => !room[1].has(room[0]));
      // const room = filtered.map((i) => i[0])[0];
      // const myRoom = rooms.find((r) => r.id === room);
      // room = myRoom.users.find((user) => user.id === socket.id);
      // room.start = true;
      // consolee.log(room)
      // const ids = [...socket.adapter.rooms.get(room.id)];
      // usersRoom = users.filter((user) => ids.includes(user.id));
      // usersRoom[0].setPosition1();
      // usersRoom[1].setPosition2();
    });

    socket.on("changeDirection", function (data) {
      console.log(room);
      // console.log(socket.id);
      // console.log("----------");
      // console.log(usersRoom);
      // const user = usersRoom.find((user) => user.id === socket.id);
      // user.changeDirection(data);
    });

    // setInterval(() => {
    //   if (room.start && usersRoom.length > 1) {
    //     usersRoom[0].move();
    //     usersRoom[1].move();
    //     socketIo.in(usersRoom[0].room).emit("move", usersRoom);
    //   }
    // }, 100);
  },
};
