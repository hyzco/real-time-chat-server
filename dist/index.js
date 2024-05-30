"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const IO_OPTIONS = {};
const io = new socket_io_1.Server(3000, IO_OPTIONS);
if (io)
    io.on("connection", (socket) => { });
io.sockets.emit("hi", "everyone");
