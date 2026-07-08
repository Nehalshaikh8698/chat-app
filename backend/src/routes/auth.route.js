import express from "express";

// Authentication Controllers
import {
  signup,
  login,
  logout,
  checkAuth,
  updateProfilePic,
} from "../controllers/auth.controller.js";

// JWT Authentication Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Create Express Router
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// Public Routes
// These routes do NOT require authentication.
////////////////////////////////////////////////////////////////////////////////

// Create a new account
router.post("/signup", signup);

// Login existing user
router.post("/login", login);

////////////////////////////////////////////////////////////////////////////////
// Protected Routes
// User must be authenticated (JWT Cookie required).
////////////////////////////////////////////////////////////////////////////////

// Logout current user
router.post("/logout", protectRoute, logout);

// Verify logged-in user and return profile
router.get("/check", protectRoute, checkAuth);

// Update profile picture
router.put("/profile-picture", protectRoute, updateProfilePic);

export default router;