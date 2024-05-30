import Room from "./Room";

export default class ChatServer {
  #user_map = new Map();
  #rooms = new Map();

  constructor() {
    // Initialize chat client properties or methods here
  }

  /**
   *
   * @param user   {User} User to add to ChatServer.
   * @returns {void}
   */
  addUserToServer(user) {
    this.#setUserMap(user);
  }

  /**
   *
   * @param roomName  {string} Room name to create a new room.
   */
  createRoom(roomName) {
    this.#rooms.set(roomName, new Room(roomName));
  }

  /**
   *
   * @param userId  Id of the user which will be added to the room.
   * @param roomName  Name of the room that the user will join.
   */
  addUserToRoom(userId, roomName) {
    const user = this.#getUserFromUserList(userId);
    const room = this.#getRoomFromMap(roomName);

    user.addRoom(room);
    room.addUser(user);
  }

  /**
   *
   * @param roomName  {string} Room name to delete a room.
   */
  deleteRoom(roomName) {
    this.#rooms.delete(roomName);
  }

  #setUserMap(user) {
    this.#user_map.set(user.id, user);
  }

  #getUserFromUserList(userId) {
    return this.#user_map.get(userId);
  }

  #getRoomFromMap(roomName) {
    return this.#rooms.get(roomName);
  }
  // #generateClientID(user) {
  //   let id = Math.random().toString(36).substr(2, 9);
  //   while (!this.#user_list.has(id))
  //     id = Math.random().toString(36).substr(2, 9);
  //   user.id = id;
  //   this.#setUserList(user);
  // }

  getUserByName(username) {
    for (let [key, value] of this.#user_map.entries())
      if (value.name === username) return value;
    return null;
  }

  /**
   *
   * @param roomName - Room name to find the corresponding room.
   * @returns {Room}
   */
  getRoomByName(roomName) {
    let room = this.#rooms.get(roomName);
    // console.log(this.#rooms.);
    if (room == undefined) throw new Error("No such room exists.");
    else return room;
  }

  getAllRooms() {
    return this.#rooms;
  }

  // sendMessage(message, userId) {
  //   const user = this.#user_list.get(userId);
  //   const room = this.getRoomByName(user.room);
  //   room.sendMessage(user, message);
  // }

  // joinRoom(userId, roomName) {
  //   const user = this.#user_list.get(userId);
  //   const room = this.getRoomByName(roomName);
  //   user.joinRoom(room);
  // }

  // Define other methods for ChatClient here
}
