import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudnary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Sidebar Users
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    })
      .select("-password")
      .sort({ fullName: 1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: {
        users,
      },
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

// Get Messages
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    })
      .populate("replyTo", "text senderId")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully.",
      data: {
        messages,
      },
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const {
      text = "",
      image,
      replyTo = null,
    } = req.body;

    if (!text.trim() && !image) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
        data: {},
      });
    }

    let attachments = [];

    // Upload Image
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat-app/messages",
      });

      attachments.push({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
        type: "image",
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text.trim(),
      attachments,
      replyTo,
    });

    await newMessage.populate("replyTo", "text senderId");

    // Send Real-Time Message
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
    console.error("Send Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {},
    });
  }
};