import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Resolve Root Directory
const __dirname = path.resolve();

// Environment Variables
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

////////////////////////////////////////////////////////////////////////////////
// Global Middlewares
////////////////////////////////////////////////////////////////////////////////

// Parse JSON Request Body
app.use(
  express.json({
    limit: "10mb",
  })
);

// Parse URL Encoded Data
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// Parse Cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

////////////////////////////////////////////////////////////////////////////////
// API Routes
////////////////////////////////////////////////////////////////////////////////

// Authentication Routes
app.use("/api/auth", authRoutes);

// Message Routes
app.use("/api/messages", messageRoutes);

////////////////////////////////////////////////////////////////////////////////
// Production Build
////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

////////////////////////////////////////////////////////////////////////////////
// 404 Route Handler
////////////////////////////////////////////////////////////////////////////////

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
    data: {},
  });
});

////////////////////////////////////////////////////////////////////////////////
// Start Server
////////////////////////////////////////////////////////////////////////////////

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Start HTTP + Socket Server
    server.listen(PORT, () => {
      console.log("======================================");
      console.log("🚀 Chat Server Started Successfully");
      console.log("======================================");
      console.log(`🌐 Environment : ${process.env.NODE_ENV || "development"}`);
      console.log(`🚪 Port        : ${PORT}`);
      console.log(`🔗 Client URL  : ${CLIENT_URL}`);
      console.log("📦 MongoDB     : Connected");
      console.log("⚡ Socket.IO   : Ready");
      console.log("======================================");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);

    process.exit(1);
  }
};

startServer();