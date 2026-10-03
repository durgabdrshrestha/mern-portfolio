import ContactMessage from "../models/ContactMessage.js";
import { sendContactReply } from "../utils/mailer.js";

// =====================================================
// CREATE CONTACT MESSAGE
// Public API
// POST /api/contact
// =====================================================

export const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, subject and message are required",
      });
    }

    // Create contact message
    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully.",
      contactMessage: {
        id: contactMessage._id,
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Create contact message error:",
      error
    );

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact information.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Server error while sending contact message",
    });
  }
};

// =====================================================
// GET ALL CONTACT MESSAGES
// Admin API
// GET /api/contact
// =====================================================

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(
      "Get contact messages error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while getting contact messages",
    });
  }
};

// =====================================================
// GET UNREAD MESSAGES
// Admin API
// GET /api/contact/unread
// =====================================================

export const getUnreadMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({
      isRead: false,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(
      "Get unread messages error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while getting unread messages",
    });
  }
};

// =====================================================
// GET SINGLE MESSAGE
// Admin API
// GET /api/contact/:id
// =====================================================

export const getContactMessageById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const contactMessage =
      await ContactMessage.findById(id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      contactMessage,
    });
  } catch (error) {
    console.error(
      "Get contact message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while getting contact message",
    });
  }
};

// =====================================================
// UPDATE CONTACT MESSAGE
// Admin API
// PUT /api/contact/:id
// =====================================================

export const updateContactMessage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { isRead } = req.body;

    const updateData = {};

    // Handle read status
    if (typeof isRead === "boolean") {
      updateData.isRead = isRead;

      if (isRead) {
        updateData.readAt = new Date();
      } else {
        updateData.readAt = null;
      }
    }

    const contactMessage =
      await ContactMessage.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact message updated successfully",
      contactMessage,
    });
  } catch (error) {
    console.error(
      "Update contact message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while updating contact message",
    });
  }
};

// =====================================================
// DELETE CONTACT MESSAGE
// Admin API
// DELETE /api/contact/:id
// =====================================================

export const deleteContactMessage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const contactMessage =
      await ContactMessage.findByIdAndDelete(id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact message deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete contact message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while deleting contact message",
    });
  }
};

export const replyToContactMessage = async (req, res) => {
  try {
    const body = req.body.body?.trim();
    if (!body) {
      return res.status(400).json({ success: false, message: "Reply message is required." });
    }

    const contactMessage = await ContactMessage.findById(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ success: false, message: "Contact message not found." });
    }

    await sendContactReply({
      to: contactMessage.email,
      subject: `Re: ${contactMessage.subject}`,
      body,
    });

    contactMessage.replies.push({ body, sentBy: req.admin._id, sentAt: new Date() });
    contactMessage.isRead = true;
    contactMessage.readAt = new Date();
    await contactMessage.save();

    return res.json({ success: true, message: "Reply sent successfully.", contactMessage });
  } catch (error) {
  console.error("========== CONTACT REPLY ERROR ==========");
  console.error("Message:", error.message);
  console.error("Code:", error.code);
  console.error("Details:", error.details);
  console.error("==========================================");

  return res.status(502).json({
    success: false,
    message: error.message || "Email delivery failed.",
  });
}
};
