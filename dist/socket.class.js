"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChatServer_instances, _ChatServer_user_map, _ChatServer_rooms, _ChatServer_setUserList, _ChatServer_getUserFromUserList, _ChatServer_getRoomFromMap;
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class User {
    constructor(name) {
        this.id = null;
        this.name = null;
        this.room = null;
        this.isConnected = false;
        this.id = Math.random().toString(36).substr(-9); // Generate a unique id for user
        this.name = name;
        this.room = "";
        this.isConnected = false;
    }
    set connected(status) {
        if (this.isConnected == status)
            return;
        console.log(`User ${this.name} is now ${status ? "Connected" : "Disconnected"} to the chat`);
        this.isConnected = status;
    }
    addRoom(newRoom) {
        const oldRoom = this.room;
        this.room = newRoom.name;
        // console.log(`[User-${this.id}] joined the room ${newRoom.name}.`);
        // socket.emit("addUserToRoom", this.id, oldRoom, this.room);
    }
}
class Room {
    constructor(name) {
        this.users = null;
        this.name = null;
        this.users = [];
        // this.messages = [];
        this.name = name;
    }
    addUser(user) {
        const index = this.users.indexOf(user);
        if (!~index)
            this.users.push(user);
        else
            throw new Error(`${user.name} is already in the room.`);
    }
    removeUser(user) {
        const index = this.users.indexOf(user);
        if (~index)
            this.users.splice(index, 1);
        else
            throw new Error(`${user.name} isn't in the room.`);
    }
}
class ChatServer {
    constructor() {
        _ChatServer_instances.add(this);
        _ChatServer_user_map.set(this, new Map());
        _ChatServer_rooms.set(this, new Map());
        // Initialize chat client properties or methods here
    }
    addUserToServer(userName) {
        const user = new User(userName);
        __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_setUserList).call(this, user);
        return user;
    }
    createRoom(roomName) {
        __classPrivateFieldGet(this, _ChatServer_rooms, "f").set(roomName, new Room(roomName));
    }
    addUserToRoom(userId, roomName) {
        const user = __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_getUserFromUserList).call(this, userId);
        const room = __classPrivateFieldGet(this, _ChatServer_instances, "m", _ChatServer_getRoomFromMap).call(this, roomName);
        user.addRoom(room);
        room.addUser(user);
    }
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
    getRoomByName(roomName) {
        let room = __classPrivateFieldGet(this, _ChatServer_rooms, "f").get(roomName);
        if (!room) {
            room = new Room(roomName);
            __classPrivateFieldGet(this, _ChatServer_rooms, "f").set(roomName, room);
        }
        return room;
    }
}
_ChatServer_user_map = new WeakMap(), _ChatServer_rooms = new WeakMap(), _ChatServer_instances = new WeakSet(), _ChatServer_setUserList = function _ChatServer_setUserList(user) {
    __classPrivateFieldGet(this, _ChatServer_user_map, "f").set(user.id, user);
}, _ChatServer_getUserFromUserList = function _ChatServer_getUserFromUserList(userId) {
    return __classPrivateFieldGet(this, _ChatServer_user_map, "f").get(userId);
}, _ChatServer_getRoomFromMap = function _ChatServer_getRoomFromMap(roomName) {
    return __classPrivateFieldGet(this, _ChatServer_rooms, "f").get(roomName);
};
class ChatServerWithSocketIO extends ChatServer {
    constructor(port, options = {}) {
        super(); // Call the constructor of the parent class
        this.isServerReady = false;
        const io = new socket_io_1.Server(port, options);
        if (io)
            console.log("SocketIO server running on port 3000");
        const chatNamespace = io.of("/chat");
        chatNamespace.on("connect", (socket) => {
            console.log("New chat client connected: ", socket.id);
        });
        this.isServerReady = true;
    }
}
exports.default = ChatServerWithSocketIO;
//# sourceMappingURL=socket.class.js.map