import mongoose from "mongoose";

const { Schema } = mongoose;

// Reaction
const reactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emoji: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Attachment
const attachmentSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video", "audio", "file"],
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

// Message
const messageSchema = new Schema(
  {
    // Sender
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Receiver
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Text Message
    text: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    // Media / File Attachments
    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    // Reply
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Forward
    isForwarded: {
      type: Boolean,
      default: false,
    },

    forwardedFrom: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Reactions
    reactions: {
      type: [reactionSchema],
      default: [],
    },

    // Edit
    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },

    // Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // Delete For Everyone
    deletedForEveryone: {
      type: Boolean,
      default: false,
    },

    // Pin
    isPinned: {
      type: Boolean,
      default: false,
    },

    pinnedAt: {
      type: Date,
      default: null,
    },

    // Delivery Status
    delivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    // Seen Status
    seen: {
      type: Boolean,
      default: false,
    },

    seenAt: {
      type: Date,
      default: null,
    },

    // Read Status
    read: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

messageSchema.index({ receiverId: 1, seen: 1 });

messageSchema.index({ senderId: 1, createdAt: -1 });

messageSchema.index({ createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;