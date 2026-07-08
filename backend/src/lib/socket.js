import express from "express";
import http from "http";
import { Server } from "socket.io";

import SOCKET_EVENTS from "../socket/socketEvents.js";
import { registerTypingEvents } from "../socket/typing.handler.js";
import { registerPresenceEvents } from "../socket/presence.handler.js";

// Express App
const app = express();

// HTTP Server
const server = http.createServer(app);

// Online Users
// { userId: socketId }
const userSocketMap = {};

// Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

/**
 * Get receiver socket ID
 */
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

/**
 * Socket Connection
 */
io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  console.log(`✅ User Connected : ${socket.id}`);

  // Logged-in User ID
  const userId =
    typeof socket.handshake.query.userId === "string"
      ? socket.handshake.query.userId
      : null;

  if (!userId) {
    socket.disconnect(true);
    return;
  }

  /**
   * Register Presence Events
   */
  registerPresenceEvents(socket, io, userId, userSocketMap);

  /**
   * Register Typing Events
   */
  registerTypingEvents(
    socket,
    io,
    userId,
    getReceiverSocketId
  );
});

export { io, app, server };