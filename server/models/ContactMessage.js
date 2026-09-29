import mongoose from "mongoose";

// Contact message schema
const contactMessageSchema = new mongoose.Schema(
  {
    // Visitor name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Visitor email
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // Message subject
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },

    // Message content
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },

    // Read/unread status
    isRead: {
      type: Boolean,
      default: false,
    },

    // Time when admin read the message
    readAt: {
      type: Date,
      default: null,
    },

    replies: [
      {
        body: { type: String, required: true, trim: true },
        sentAt: { type: Date, default: Date.now },
        sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create ContactMessage model
const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);

export default ContactMessage;