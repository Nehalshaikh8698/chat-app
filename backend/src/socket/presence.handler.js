import SOCKET_EVENTS from "./socketEvents.js";

/**
 * Register user presence events.
 *
 * Handles:
 * - User connection
 * - User disconnection
 * - Online users list
 *
 * @param {object} socket - Connected socket
 * @param {object} io - Socket.IO server
 * @param {string} userId - Logged-in user ID
 * @param {Object} userSocketMap - Online users map
 */
export const registerPresenceEvents = (
  socket,
  io,
  userId,
  userSocketMap
) => {
  /**
   * Save user's socket
   */
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  /**
   * Broadcast online users
   */
  io.emit(
    SOCKET_EVENTS.GET_ONLINE_USERS,
    Object.keys(userSocketMap)
  );

  /**
   * Handle disconnect
   */
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log(`❌ User Disconnected : ${socket.id}`);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit(
      SOCKET_EVENTS.GET_ONLINE_USERS,
      Object.keys(userSocketMap)
    );
  });
};
