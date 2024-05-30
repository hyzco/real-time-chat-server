export default class Room {
  users = null;
  name = null;
  messages = [];

  constructor(name) {
    this.users = [];
    this.messages = [];
    this.name = name;
  }

  /**
   * @method addUser
   * @param user - User object to add.
   * @returns {void}: No return
   * @throws {Error}
   */
  addUser(user) {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) this.users.push(user);
    else console.info(`${user.name} is already in the room.`);
  }

  /**
   * @method removeUser
   * @param user - User object to remove.
   * @returns {void}: No return
   * @throws {Error}
   */
  removeUser(user) {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) this.users.splice(index, 1);
    else console.warn(`${user.name} isn't in the room.`);
  }

  /**
   * @method addMessage
   * @param {string} userId - ID of the user sending the message.
   * @param {string} message - Message content.
   * @returns {void}: No return
   */
  addMessage(userId, message) {
    this.messages.push({ userId, message });
  }

  /**
   * @method getMessages
   * @returns {Array}: Array of messages in the room.
   */
  getMessages() {
    return this.messages;
  }

  /**
   * @method clearMessages
   * @returns {void}: No return
   */
  clearMessages() {
    this.messages = [];
  }

  isUserInRoom(userId) {
    return this.users.has(userId);
  }

  broadcastMessage(socket, msgObj) {
    const { userId, message } = msgObj;
    this.messages.push({ userId, message });
    // Here, you can emit the message to all users in the room using Socket.io
    // For example, you can emit a 'message' event to the room namespace with the message details.
    // This logic should be handled in the ChatServerWithSocketIO class.
    console.log(msgObj);
    socket.broadcast.emit("receive_message", msgObj); // Emit the messages back to the client
  }
}
