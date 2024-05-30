import { Server } from "socket.io";
import ChatServer from "./ChatServer";
import UserMap from "./UserMap";
import User from "./User";
import SocketMap from "./SocketMap";

export default class ChatServerWithSocketIO extends ChatServer {
  isServerReady = false;
  #clientSockets = new SocketMap();
  #usersMap = new UserMap();

  constructor(port, options = {}) {
    super();

    this.createRoom("general");

    const io = new Server(port, options);
    if (io) console.log("SocketIO server running on port 3000");

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
      socket.emit("register_user", user , (ack)=>{
        
      })
      socket.on("register_user", (user, ack) =>
      this.registerUser(socket, user, ack)
      );
      socket.on("unregister_user", (ack) => this.unregisterUser(socket, ack));
      socket.on("send_message", (data) => this.sendMessage(socket, data));

      socket.on("get_available_rooms", (sendRooms) =>
      this.sendAvailableRoomsToCLient(sendRooms)
      );

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

  joinToRoom = (data, ack) => {
    const { user, roomName } = data;
    const room = this.getRoomByName(roomName);
    const userObject = this.#usersMap.getUserById(user.id);
    
    if (!room || !userObject) {
      ack(false);
      return;
    }

    room.addUser(userObject); // Assuming this method exists and handles the logic
    console.log(`User ${userObject.name} joined room: ${roomName}`);
    ack(true);
  };

  sendAvailableRoomsToCLient = (sendRooms) => {
    sendRooms(Array.from(this.getAllRooms()));
  };

  registerUser(socket, user, ack) {
    const userToRegister = new User(user.name, socket.id);
    const userExist = this.#usersMap.has(user.id);
    if (!userExist) {
      userToRegister.connected(true);

      this.#usersMap.addUser(userToRegister);
      this.#clientSockets.set(userToRegister.id, {
        id: socket.id,
        self: socket,
      });

      console.log(`User ${userToRegister.name} has registered.`);
    } 

    ack({ isRegistered: !userExist });
  }

  unregisterUser(socket, ack) {
    const userToRemove = this.#usersMap.getUserBySocketId(socket.id);
    if (userToRemove) {
      this.#usersMap.removeUser(userToRemove.id);
      this.#clientSockets.removeSocket(userToRemove.id);
      userToRemove.connected(false);
      console.log(`User ${userToRemove.name} has unregistered.`);
    } else {
      console.log("[Chat Server] user could not found to unregister..");
    }

    ack({ isRemoved: userToRemove });
  }

  sendMessage(socket, data) {
    const { roomName, message } = data;
    const user = this.#usersMap.getUserBySocketId(socket.id);
    
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
