/**
 * Socket.IO Event Names
 * ---------------------
 * Centralized event constants used across
 * backend and frontend.
 */

export const SOCKET_EVENTS = {
  // Connection
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  // Presence
  GET_ONLINE_USERS: "getOnlineUsers",
  USER_ONLINE: "userOnline",
  USER_OFFLINE: "userOffline",
  LAST_SEEN: "lastSeen",

  // Messages
  NEW_MESSAGE: "newMessage",
  SEND_MESSAGE: "sendMessage",

  // Typing
  TYPING: "typing",
  STOP_TYPING: "stopTyping",

  // Message Status
  MESSAGE_DELIVERED: "messageDelivered",
  MESSAGE_SEEN: "messageSeen",

  // Message Actions
  MESSAGE_EDITED: "messageEdited",
  MESSAGE_DELETED: "messageDeleted",
  MESSAGE_REACTION: "messageReaction",
  MESSAGE_PINNED: "messagePinned",
  MESSAGE_FORWARDED: "messageForwarded",
  MESSAGE_REPLIED: "messageReplied",

  // Notifications
  NOTIFICATION: "notification",

  // Errors
  ERROR: "error",
};

export default SOCKET_EVENTS;