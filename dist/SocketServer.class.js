"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ChatServerWithSocketIO_clientSockets, _ChatServerWithSocketIO_usersMap;
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ChatServer_1 = __importDefault(require("./ChatServer"));
const UserMap_1 = __importDefault(require("./UserMap"));
const User_1 = __importDefault(require("./User"));
const SocketMap_1 = __importDefault(require("./SocketMap"));
class ChatServerWithSocketIO extends ChatServer_1.default {
    constructor(port, options = {}) {
        super();
        this.isServerReady = false;
        _ChatServerWithSocketIO_clientSockets.set(this, new SocketMap_1.default());
        _ChatServerWithSocketIO_usersMap.set(this, new UserMap_1.default());
        this.joinToRoom = (data, ack) => {
            const { user, roomName } = data;
            const room = this.getRoomByName(roomName);
            const userObject = __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").getUserById(user.id);
            if (!room || !userObject) {
                ack(false);
                return;
            }
            room.addUser(userObject); // Assuming this method exists and handles the logic
            console.log(`User ${userObject.name} joined room: ${roomName}`);
            ack(true);
        };
        this.sendAvailableRoomsToCLient = (sendRooms) => {
            sendRooms(Array.from(this.getAllRooms()));
        };
        this.createRoom("general");
        const io = new socket_io_1.Server(port, options);
        if (io)
            console.log("SocketIO server running on port 3000");
        const chatNamespace = io.of("/chat");
        // chatNamespace.on("connect", (socket) => {
        //   console.log("Client connected.");
        //   this.#clientSockets.add(socket.id, socket);
        // });
        // chatNamespace.on("disconnect", (socket) => {
        //   console.log("Client is disconnected.");
        //   this.#clientSockets.delete(socket.id);
        // });
        chatNamespace.on("connection", (socket) => {
            socket.emit("register_user", user, (ack) => {
            });
            socket.on("register_user", (user, ack) => this.registerUser(socket, user, ack));
            socket.on("unregister_user", (ack) => this.unregisterUser(socket, ack));
            socket.on("send_message", (data) => this.sendMessage(socket, data));
            socket.on("get_available_rooms", (sendRooms) => this.sendAvailableRoomsToCLient(sendRooms));
            socket.on("join_to_room", (data, ack) => this.joinToRoom(data, ack));
            // socket.on("receive_message", (data, ack) => {
            //   const { roomName } = data;
            //   const room = this.getRoomByName(roomName);
            //   if (room) {
            //     const messages = room.getMessages();
            //     socket.emit("receive_message", messages); // Emit the messages back to the client
            //   } else {
            //     socket.emit("receive_message", []); // If room not found, emit an empty array
            //   }
            // });
        });
        this.isServerReady = true;
    }
    registerUser(socket, user, ack) {
        const userToRegister = new User_1.default(user.name, socket.id);
        const userExist = __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").has(user.id);
        if (!userExist) {
            userToRegister.connected(true);
            __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").addUser(userToRegister);
            __classPrivateFieldGet(this, _ChatServerWithSocketIO_clientSockets, "f").set(userToRegister.id, {
                id: socket.id,
                self: socket,
            });
            console.log(`User ${userToRegister.name} has registered.`);
        }
        ack({ isRegistered: !userExist });
    }
    unregisterUser(socket, ack) {
        const userToRemove = __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").getUserBySocketId(socket.id);
        if (userToRemove) {
            __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").removeUser(userToRemove.id);
            __classPrivateFieldGet(this, _ChatServerWithSocketIO_clientSockets, "f").removeSocket(userToRemove.id);
            userToRemove.connected(false);
            console.log(`User ${userToRemove.name} has unregistered.`);
        }
        else {
            console.log("[Chat Server] user could not found to unregister..");
        }
        ack({ isRemoved: userToRemove });
    }
    sendMessage(socket, data) {
        const { roomName, message } = data;
        const user = __classPrivateFieldGet(this, _ChatServerWithSocketIO_usersMap, "f").getUserBySocketId(socket.id);
        if (!user) {
            console.error("User not found or not registered.");
            return; // Stop if the user is not registered
        }
        // const room = this.getRoomByName(roomName);
        // if (!room || !room.isUserInRoom(user.id)) {
        //   console.error(
        //     "User is not in the specified room or the room does not exist."
        //   );
        //   return; // Ensure the user is in the room
        // }
        const messageObj = {
            userId: user.id,
            userName: user.name,
            message: message,
        };
        socket.broadcast.emit("receive_message", messageObj); // Emit the messages back to the client
        // this.broadcastMessage(socket, messageObj);
    }
}
_ChatServerWithSocketIO_clientSockets = new WeakMap(), _ChatServerWithSocketIO_usersMap = new WeakMap();
exports.default = ChatServerWithSocketIO;
//# sourceMappingURL=SocketServer.class.js.map