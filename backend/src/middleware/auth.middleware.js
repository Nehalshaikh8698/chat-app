/**
 * ============================================================================
 * Authentication Middleware
 * ============================================================================
 *
 * This middleware protects private routes.
 *
 * Workflow:
 *
 * Client
 *    │
 *    │ Request with JWT Cookie
 *    ▼
 * Verify JWT
 *    │
 *    ▼
 * Find User
 *    │
 *    ▼
 * Attach user to req.user
 *    │
 *    ▼
 * Continue to Controller
 *
 */

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * ============================================================================
 * Protect Private Routes
 * ============================================================================
 */
export const protectRoute = async (req, res, next) => {
  try {
    // Get JWT token from browser cookie
    const token = req.cookies.jwt;

    // No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    /**
     * Verify JWT
     * If token is expired or invalid,
     * jwt.verify() will throw an error.
     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * Find current user
     *
     * Password is excluded automatically
     * because of select:false in our schema.
     */
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /**
     * Attach logged in user
     * so every protected controller
     * can access it.
     *
     * Example:
     *
     * req.user._id
     * req.user.username
     * req.user.email
     */
    req.user = user;

    next();
  } catch (error) {
    console.error("Protect Route Error:", error.message);

    // Invalid JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // Expired JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};