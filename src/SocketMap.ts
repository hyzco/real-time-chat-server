import { TSocket } from "./Types";

/**
 *
 * @extends Map
  {key: "user.id", value: socket}
 */
export default class SocketMap extends Map<string, TSocket> {
  constructor() {
    super();
  }

  getByValue(searchValue, objAttribute) {
    for (let [key, value] of this.entries()) {
      if (value[objAttribute] === searchValue) return [key, value];
    }
    return null;
  }

  addSocket(userId, socket) {
    this.set(userId, socket);
  }

  removeSocket(userId) {
    const isExists = this.has(userId);
    if (isExists) {
      this.delete(userId);
    }
  }

  getSocketByUserId(userId) {
    return this.get(userId);
  }

  getSocketBySocketId(socketId) {
    return this.getByValue(socketId, "id");
  }

  // getUserBySocketId(socketId) {}
}
