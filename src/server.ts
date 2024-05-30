import ChatServerWithSocketIO from "./SocketServer.class";

const IO_OPTIONS = {};
const server = new ChatServerWithSocketIO(3000, IO_OPTIONS);
if (server.isServerReady) {
  console.log("Server is ready..");
}
