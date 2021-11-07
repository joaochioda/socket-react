module.exports = {
  user(id, name, roomId) {
    const user = {};
    user.id = id;
    user.name = name;
    user.room = roomId;

    /* 
        function nomeCompleto() {
          return pessoa.nome pessoa.sobrenome
        }
      
        pessoa.nomeCompleto = nomeCompleto
        */

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
