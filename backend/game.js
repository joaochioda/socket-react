module.exports = {
  game(socket, users, socketIo) {
    users[0].setPosition1();
    users[1].setPosition2();

    socket.on("changeDirection", function (data) {
      // console.log(data);
      // const user = users.find((user) => user.id === socket.id);
      // console.log(data);
      users[1].changeDirection(data);
    });

    setInterval(() => {
      users[0].move();
      users[1].move();
      socketIo.in(users[0].room).emit("move", users);
    }, 200);
  },
};
