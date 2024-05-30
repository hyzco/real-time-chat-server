"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ChatServer_instances, _ChatServer_user_map, _ChatServer_rooms, _ChatServer_setUserMap, _ChatServer_getUserFromUserList, _ChatServer_getRoomFromMap;
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("./Room"));
class ChatServer {
    constructor() {
        _ChatServer_instances.add(this);
        _ChatServer_user_map.set(this, new Map());
        _ChatServer_rooms.set(this, new Map());
        // Initialize chat client properties or methods here
    }
    /**
     *
     * @param user   {User} User to add to ChatServer.
     * @returns {void}
     */
    addUserToServer(user) {
        __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_setUserMap).call(this, user);
    }
    /**
     *
     * @param roomName  {string} Room name to create a new room.
     */
    createRoom(roomName) {
        __classPrivateFieldGet(this, _ChatServer_rooms, "f").set(roomName, new Room_1.default(roomName));
    }
    /**
     *
     * @param userId  Id of the user which will be added to the room.
     * @param roomName  Name of the room that the user will join.
     */
    addUserToRoom(userId, roomName) {
        const user = __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_getUserFromUserList).call(this, userId);
        const room = __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_getRoomFromMap).call(this, roomName);
        user.addRoom(room);
        room.addUser(user);
    }
    /**
     *
     * @param roomName  {string} Room name to delete a room.
     */
    deleteRoom(roomName) {
        __classPrivateFieldGet(this, _ChatServer_rooms, "f").delete(roomName);
    }
    // #generateClientID(user) {
    //   let id = Math.random().toString(36).substr(2, 9);
    //   while (!this.#user_list.has(id))
    //     id = Math.random().toString(36).substr(2, 9);
    //   user.id = id;
    //   this.#setUserList(user);
    // }
    getUserByName(username) {
        for (let [key, value] of __classPrivateFieldGet(this, _ChatServer_user_map, "f").entries())
            if (value.name === username)
                return value;
        return null;
    }
    /**
     *
     * @param roomName - Room name to find the corresponding room.
     * @returns {Room}
     */
    getRoomByName(roomName) {
        let room = __classPrivateFieldGet(this, _ChatServer_rooms, "f").get(roomName);
        // console.log(this.#rooms.);
        if (room == undefined)
            throw new Error("No such room exists.");
        else
            return room;
    }
    getAllRooms() {
        return __classPrivateFieldGet(this, _ChatServer_rooms, "f");
    }
}
_ChatServer_user_map = new WeakMap(), _ChatServer_rooms = new WeakMap(), _ChatServer_instances = new WeakSet(), _ChatServer_setUserMap = function _ChatServer_setUserMap(user) {
    __classPrivateFieldGet(this, _ChatServer_user_map, "f").set(user.id, user);
}, _ChatServer_getUserFromUserList = function _ChatServer_getUserFromUserList(userId) {
    return __classPrivateFieldGet(this, _ChatServer_user_map, "f").get(userId);
}, _ChatServer_getRoomFromMap = function _ChatServer_getRoomFromMap(roomName) {
    return __classPrivateFieldGet(this, _ChatServer_rooms, "f").get(roomName);
};
exports.default = ChatServer;
//# sourceMappingURL=ChatServer.js.map