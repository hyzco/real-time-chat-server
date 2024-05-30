"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, socketId) {
        this.id = null;
        this.name = null;
        this.room = null;
        this.socketId = null;
        this.isConnected = false;
        this.id = Math.random().toString(36).substr(-9); // Generate a unique id for user
        this.name = name;
        this.room = "";
        this.socketId = socketId;
        this.isConnected = false;
    }
    connected(status, reConnection = false) {
        if (this.isConnected == status)
            return;
        console.log(`User ${this.name} is now ${status ? (reConnection ? "reconnected" : "connected") : "disconnected"} to the chat`);
        this.isConnected = status;
    }
    disconnect() {
        if (this.isConnected === true) {
            this.room = null;
            this.socketId = null;
            this.isConnected = false;
        }
    }
    reconnect(socketId) {
        this.socketId = socketId;
        this.connected(true, true);
    }
    addRoom(newRoom) {
        const oldRoom = this.room;
        this.room = newRoom.name;
        // console.log(`[User-${this.id}] joined the room ${newRoom.name}.`);
        // socket.emit("addUserToRoom", this.id, oldRoom, this.room);
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map