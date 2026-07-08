import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";
import SOCKET_EVENTS from "../socket/socketEvents.js";

export const useChatStore = create((set, get) => ({
  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  users: [],
  messages: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  // Typing State
  isTyping: false,
  typingUserId: null,

  //////////////////////////////////////////////////////
  // Get Sidebar Users
  //////////////////////////////////////////////////////

  getUsers: async () => {
    set({
      isUsersLoading: true,
    });

    try {
      const res = await axiosInstance.get("/messages/users");

      set({
        users: res.data.data.users,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load users."
      );
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Get Messages
  //////////////////////////////////////////////////////

  getMessages: async (userId) => {
    set({
      isMessagesLoading: true,
    });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      set({
        messages: res.data.data.messages,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load messages."
      );
    } finally {
      set({
        isMessagesLoading: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Send Message
  //////////////////////////////////////////////////////

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set((state) => ({
        messages: [
          ...state.messages,
          res.data.data.message,
        ],
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send message."
      );
    }
  },

  //////////////////////////////////////////////////////
  // Typing
  //////////////////////////////////////////////////////

  startTyping: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.emit(SOCKET_EVENTS.TYPING, {
      receiverId: selectedUser._id,
    });
  },

  stopTyping: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.emit(SOCKET_EVENTS.STOP_TYPING, {
      receiverId: selectedUser._id,
    });
  },

  //////////////////////////////////////////////////////
  // Subscribe To Typing
  //////////////////////////////////////////////////////

  subscribeToTyping: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.off(SOCKET_EVENTS.TYPING);
    socket.off(SOCKET_EVENTS.STOP_TYPING);

    socket.on(SOCKET_EVENTS.TYPING, ({ senderId }) => {
      if (senderId !== selectedUser._id) return;

      set({
        isTyping: true,
        typingUserId: senderId,
      });
    });

    socket.on(SOCKET_EVENTS.STOP_TYPING, ({ senderId }) => {
      if (senderId !== selectedUser._id) return;

      set({
        isTyping: false,
        typingUserId: null,
      });
    });
  },

  //////////////////////////////////////////////////////
  // Unsubscribe Typing
  //////////////////////////////////////////////////////

  unsubscribeFromTyping: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off(SOCKET_EVENTS.TYPING);
    socket.off(SOCKET_EVENTS.STOP_TYPING);
  },

  //////////////////////////////////////////////////////
  // Listen For Messages
  //////////////////////////////////////////////////////

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.off(SOCKET_EVENTS.NEW_MESSAGE);

    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
      const isCurrentChat =
        newMessage.senderId === selectedUser._id;

      if (!isCurrentChat) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  //////////////////////////////////////////////////////
  // Stop Listening
  //////////////////////////////////////////////////////

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off(SOCKET_EVENTS.NEW_MESSAGE);
  },

  //////////////////////////////////////////////////////
  // Change Selected User
  //////////////////////////////////////////////////////

  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
      messages: [],
      isTyping: false,
      typingUserId: null,
    });
  },
}));