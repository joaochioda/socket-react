module.exports = {
  user(id, name, roomId) {
    const user = {};
    user.id = id;
    user.name = name;
    user.room = roomId;
    let x = 0;
    let y = 0;
    user.tail = [];

    function setPosition1() {
      user.tail = [
        [100, 100],
        [85, 100],
        [70, 100],
        [55, 100],
      ];
      x = 100;
      y = 100;
    }
    function setPosition2() {
      user.tail = [
        [300, 100],
        [285, 100],
        [270, 100],
        [255, 100],
      ];
      x = 300;
      y = 100;
    }

    function delta(dx, dy) {
      x += dx;
      y += dy;
      user.tail.unshift([x, y]);
      user.tail.pop();
    }

    user.setPosition1 = setPosition1;
    user.setPosition2 = setPosition2;
    user.delta = delta;

    return user;
  },
  room(id, name) {
    const room = {};
    room.id = id;
    room.name = name;
    room.users = [];

    return room;
  },
};
