"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @extends Map
 */
class UserMap extends Map {
    constructor() {
        super();
    }
    getByValue(searchValue, objAttribute) {
        for (let [key, value] of this.entries()) {
            if (value[objAttribute] === searchValue)
                return [key, value];
        }
        return null;
    }
    addUser(user) {
        this.set(user.socketId, user);
    }
    removeUser(userId) {
        const isUserExist = this.has(userId);
        if (isUserExist) {
            this.delete(userId);
        }
    }
    getUserById(userId) {
        return this.getByValue(userId, "id");
    }
    getUserBySocketId(socketId) {
        return this.getByValue(socketId, "socketId")[1];
    }
}
exports.default = UserMap;
//# sourceMappingURL=UserMap%20copy.js.map