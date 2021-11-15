module.exports = {
  user(id, name, roomId) {
    const user = {};
    user.id = id;
    user.name = name;
    user.room = roomId;
    let x = 0;
    let y = 0;
    let dx = 15;
    let dy = 0;
    const limit = 600;
    user.tail = [];

    const velocity = 15;

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

    function move(apple_x, apple_y, generatesApple, room) {
      if (x + dx >= limit) {
        x = 0;
      } else if (x + dx <= 0) {
        x = limit;
      } else if (y + dy >= limit) {
        y = 0;
      } else if (y + dy <= 0) {
        y = limit;
      } else {
        x += dx;
        y += dy;
      }
      if (checkCollision(apple_x, apple_y)) {
        user.tail.unshift([x, y]);
        generatesApple(room);
      } else {
        user.tail.unshift([x, y]);
        user.tail.pop();
      }
    }

    function checkCollision(apple_x, apple_y) {
      appleHeight = 15;
      appleWidth = 15;
      ballHeight = 15;
      ballWidth = 15;

      if (
        x < apple_x + appleWidth &&
        x + ballWidth > apple_x &&
        y < apple_y + appleHeight &&
        y + ballHeight > apple_y
      ) {
        return true;
      }
    }

    function changeDirection(key) {
      switch (key) {
        case "ArrowUp":
          if (dy === velocity) return;
          dx = 0;
          dy = -velocity;
          break;
        case "ArrowDown":
          if (dy === -velocity) return;
          dx = 0;
          dy = velocity;
          break;
        case "ArrowLeft":
          if (dx === velocity) return;
          dx = -velocity;
          dy = 0;
          break;
        case "ArrowRight":
          if (dx === -velocity) return;
          dx = velocity;
          dy = 0;
          break;
        default:
          break;
      }
    }

    user.setPosition1 = setPosition1;
    user.setPosition2 = setPosition2;
    user.move = move;
    user.changeDirection = changeDirection;

    return user;
  },
  room(id, name) {
    const room = {};
    room.id = id;
    room.name = name;
    room.users = [];
    room.start = false;
    room.apple = [];
    return room;
  },
};
