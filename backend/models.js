module.exports = {
  user(id, name, roomId) {
    const user = {};
    user.id = id;
    user.name = name;
    user.room = roomId;
    user.x = 0;
    user.y = 0;
    function setPosition1() {
      user.x = 100;
      user.y = 100;
    }
    function setPosition2() {
      user.x = 300;
      user.y = 300;
    }

    function delta(x, y) {
      user.x += x;
      user.y += y;
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
