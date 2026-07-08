import { create } from "zustand";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

// Socket URL
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "/");

export const useAuthStore = create((set, get) => ({
  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  authUser: null,

  socket: null,

  onlineUsers: [],

  isCheckingAuth: true,

  isSigningUp: false,

  isLoggingIn: false,

  isUpdatingProfile: false,

  //////////////////////////////////////////////////////
  // Check Authentication
  //////////////////////////////////////////////////////

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({
        authUser: res.data.data.user,
      });

      get().connectSocket();
    } catch (error) {
      console.error("Check Auth Error:", error);

      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Signup
  //////////////////////////////////////////////////////

  signup: async (userData) => {
    set({
      isSigningUp: true,
    });

    try {
      const res = await axiosInstance.post("/auth/signup", userData);

      set({
        authUser: res.data.data.user,
      });

      toast.success(res.data.message);

      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Signup failed."
      );
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Login
  //////////////////////////////////////////////////////

  login: async (userData) => {
    set({
      isLoggingIn: true,
    });

    try {
      const res = await axiosInstance.post("/auth/login", userData);

      set({
        authUser: res.data.data.user,
      });

      toast.success(res.data.message);

      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed."
      );
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Logout
  //////////////////////////////////////////////////////

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      get().disconnectSocket();

      set({
        authUser: null,
        onlineUsers: [],
      });

      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed."
      );
    }
  },

  //////////////////////////////////////////////////////
  // Update Profile Picture
  //////////////////////////////////////////////////////

  updateProfile: async (profileData) => {
    set({
      isUpdatingProfile: true,
    });

    try {
      const res = await axiosInstance.put(
        "/auth/profile-picture",
        profileData
      );

      set((state) => ({
        authUser: {
          ...state.authUser,
          ...res.data.data.user,
        },
      }));

      toast.success(res.data.message);
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Profile update failed."
      );
    } finally {
      set({
        isUpdatingProfile: false,
      });
    }
  },

  //////////////////////////////////////////////////////
  // Connect Socket
  //////////////////////////////////////////////////////

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;

    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,

      query: {
        userId: authUser._id,
      },
    });

    newSocket.connect();

    set({
      socket: newSocket,
    });

    // Online Users
    newSocket.on("getOnlineUsers", (users) => {
      set({
        onlineUsers: users,
      });
    });
  },

  //////////////////////////////////////////////////////
  // Disconnect Socket
  //////////////////////////////////////////////////////

  disconnectSocket: () => {
    const { socket } = get();

    if (!socket) return;

    socket.disconnect();

    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));