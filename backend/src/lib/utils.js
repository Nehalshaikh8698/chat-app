/**
 * ============================================================================
 * JWT Utility Functions
 * ============================================================================
 *
 * This file contains helper functions related to authentication.
 *
 * Currently it is responsible for:
 * 1. Generating a JWT (JSON Web Token)
 * 2. Storing the token securely inside an HTTP-only cookie
 *
 * Why use a separate file?
 * ------------------------
 * Instead of writing JWT logic inside every controller,
 * we write it once here and reuse it everywhere.
 *
 * Example:
 *
 * Signup Controller
 *      │
 *      ├── generateToken(userId, res)
 *      │
 *      ▼
 * Generates JWT
 *      │
 *      ▼
 * Stores JWT inside browser cookie
 *
 * This keeps our controllers clean and follows the
 * "Don't Repeat Yourself (DRY)" principle.
 * ============================================================================
 */

import jwt from "jsonwebtoken";

/**
 * ============================================================================
 * generateToken()
 * ============================================================================
 *
 * Creates a JWT token and stores it inside an HTTP-only cookie.
 *
 * Parameters:
 * -----------
 * userId : MongoDB User ID
 * res    : Express Response Object
 *
 * Returns:
 * --------
 * Generated JWT token
 *
 * This function is used during:
 * ✔ Signup
 * ✔ Login
 * ============================================================================
 */

export const generateToken = (userId, res) => {

  /**
   * Create JWT Token
   *
   * Payload:
   * {
   *    userId: "686abc123..."
   * }
   *
   * JWT_SECRET comes from .env
   */
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  /**
   * Store JWT inside an HTTP-only Cookie.
   *
   * Why Cookies?
   * ------------
   * Browser automatically sends the cookie with every request.
   *
   * Why HTTP Only?
   * --------------
   * JavaScript cannot access the cookie.
   * This protects against many XSS attacks.
   */

  res.cookie("jwt", token, {

    /**
     * Cookie expires after 7 days.
     */
    maxAge: 7 * 24 * 60 * 60 * 1000,

    /**
     * Prevent JavaScript from accessing the cookie.
     *
     * Helps protect authentication tokens.
     */
    httpOnly: true,

    /**
     * Prevents CSRF attacks.
     *
     * "strict" means the cookie is only sent when
     * navigating within the same site.
     */
    sameSite: "strict",

    /**
     * Cookie is sent only over HTTPS in production.
     *
     * During development (localhost), HTTPS usually
     * isn't used, so we disable it.
     */
    secure: process.env.NODE_ENV === "production",
  });

  /**
   * Return token in case we need it later.
   */
  return token;
};