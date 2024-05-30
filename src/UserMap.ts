/**
 *
 * @extends Map
 */
export default class UserMap extends Map {
  constructor() {
    super();
  }

  getByValue(searchValue, objAttribute) {
    for (let [key, value] of this.entries()) {
      if (value[objAttribute] === searchValue) return [key, value];
    }
    return null;
  }

  addUser(user) {
    console.log("added user: ", user);
    this.set(user.socketId, user);
  }

  removeUser(userId) {
    const isUserExist = this.has(userId);
    if (isUserExist) {
      this.delete(userId);
    }
  }

  getUserById(userId) {
    const isUserExist = this.has(userId);
    console.log("USERMAP", this);
    if(isUserExist){
      return this.getByValue(userId, "id")[1] && null;
    }
  }

  getUserBySocketId(socketId) {
    const user = this.getByValue(socketId, "socketId");
    console.log("USER:", user);
    if (!user) return null;
    return user[1];
  }
}
