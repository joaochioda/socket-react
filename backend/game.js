module.exports = {
  game(socket, users, socketIo) {
    users[0].setPosition1();
    users[1].setPosition2();

    setInterval(() => {
      users[0].delta(15, 0);
      users[1].delta(-15, 0);
      console.log(users[0].x);
      socketIo.in(users[0].room).emit("move", users);
    }, 1000);
  },
};
