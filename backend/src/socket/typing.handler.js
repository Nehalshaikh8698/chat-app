import SOCKET_EVENTS from "./socketEvents.js";

/**
 * Register typing related socket events.
 *
 * @param {object} socket - Connected socket instance
 * @param {object} io - Socket.IO server instance
 * @param {string} userId - Current logged-in user ID
 * @param {Function} getReceiverSocketId - Function to get receiver's socket ID
 */
export const registerTypingEvents = (
  socket,
  io,
  userId,
  getReceiverSocketId
) => {
  /**
   * User Started Typing
   */
  socket.on(SOCKET_EVENTS.TYPING, ({ receiverId }) => {
    if (!receiverId) return;

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit(SOCKET_EVENTS.TYPING, {
      senderId: userId,
    });
  });

  /**
   * User Stopped Typing
   */
  socket.on(SOCKET_EVENTS.STOP_TYPING, ({ receiverId }) => {
    if (!receiverId) return;

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit(SOCKET_EVENTS.STOP_TYPING, {
      senderId: userId,
    });
  });
};