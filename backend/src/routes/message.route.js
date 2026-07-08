import express from "express";

// Authentication Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Message Controllers
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

// Create Express Router
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// Protected Routes
// All chat routes require authentication.
////////////////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/messages/users
 * @desc    Get all users for sidebar
 * @access  Private
 */
router.get("/users", protectRoute, getUsersForSidebar);

/**
 * @route   GET /api/messages/:id
 * @desc    Get conversation with a user
 * @access  Private
 */
router.get("/:id", protectRoute, getMessages);

/**
 * @route   POST /api/messages/send/:id
 * @desc    Send message to a user
 * @access  Private
 */
router.post("/send/:id", protectRoute, sendMessage);

export default router;