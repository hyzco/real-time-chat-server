"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SocketServer_class_1 = __importDefault(require("./SocketServer.class"));
const IO_OPTIONS = {};
const server = new SocketServer_class_1.default(3000, IO_OPTIONS);
if (server.isServerReady) {
    console.log("Server is ready..");
}
//# sourceMappingURL=server.js.map