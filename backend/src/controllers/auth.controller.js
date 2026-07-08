import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudnary.js";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

//////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

//////////////////////////////////////////////////////
// Helper
//////////////////////////////////////////////////////

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  profilePic: user.profilePic,
  bio: user.bio,
  isOnline: user.isOnline,
  lastSeen: user.lastSeen,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

//////////////////////////////////////////////////////
// Signup
//////////////////////////////////////////////////////

export const signup = async (req, res) => {
  try {
    let { fullName, username, email, password } = req.body;

    fullName = fullName?.trim();
    username = username?.trim().toLowerCase();
    email = email?.trim().toLowerCase();

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
        data: {},
      });
    }

    if (!USERNAME_REGEX.test(username)) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be 3-20 characters and contain only letters, numbers and underscore.",
        data: {},
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
        data: {},
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already exists."
            : "Username already exists.",
        data: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    generateToken(user._id, res);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Login
//////////////////////////////////////////////////////

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
        data: {},
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        data: {},
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        data: {},
      });
    }

    generateToken(user._id, res);

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Logout
//////////////////////////////////////////////////////

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
      data: {},
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Check Authentication
//////////////////////////////////////////////////////

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Authenticated user.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Check Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Update Profile Picture
//////////////////////////////////////////////////////

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required.",
        data: {},
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }

    if (user.profilePic) {
      try {
        const publicId = user.profilePic.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary Delete Error:",
          cloudinaryError
        );
      }
    }

    const uploadResponse = await cloudinary.uploader.upload(
      profilePic,
      {
        folder: "chat-app/profile-pictures",
      }
    );

    user.profilePic = uploadResponse.secure_url;

    await user.save();
        return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Update Profile Picture Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Update Profile
//////////////////////////////////////////////////////

export const updateProfile = async (req, res) => {
  try {
    const { fullName, username, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }

    // Update Full Name
    if (fullName !== undefined) {
      if (!fullName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Full name cannot be empty.",
          data: {},
        });
      }

      user.fullName = fullName.trim();
    }

    // Update Username
    if (username !== undefined) {
      const formattedUsername = username.trim().toLowerCase();

      if (!USERNAME_REGEX.test(formattedUsername)) {
        return res.status(400).json({
          success: false,
          message:
            "Username must be 3-20 characters and contain only letters, numbers and underscore.",
          data: {},
        });
      }

      const usernameExists = await User.findOne({
        username: formattedUsername,
        _id: { $ne: req.user._id },
      });

      if (usernameExists) {
        return res.status(409).json({
          success: false,
          message: "Username already exists.",
          data: {},
        });
      }

      user.username = formattedUsername;
    }

    // Update Bio
    if (bio !== undefined) {
      user.bio = bio.trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Change Password
//////////////////////////////////////////////////////

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
        data: {},
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters.",
        data: {},
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
        data: {},
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
        return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

//////////////////////////////////////////////////////
// Delete Account
//////////////////////////////////////////////////////

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }

    // Delete profile picture from Cloudinary
    if (user.profilePic) {
      try {
        const publicId = user.profilePic
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary Delete Error:",
          cloudinaryError
        );
      }
    }

    await User.findByIdAndDelete(req.user._id);

    // Clear JWT Cookie
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
      data: {},
    });
  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};