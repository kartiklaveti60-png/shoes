import { ContactMessage } from '../models/ContactMessage.js';

// In-memory fallback store for when MongoDB is not connected
let memoryMessagesStore = [
  {
    _id: 'msg_demo_101',
    name: 'Jordan Belfort',
    email: 'belfort@stratton.com',
    subject: 'Sneaker Grail Sourcing',
    message: 'Looking for a size US 10.5 of Air Jordan 1 Off-White Chicago in deadstock condition with OG box. Urgent inquiry for collection.',
    status: 'Unread',
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

// @desc    Submit a new customer contact message / inquiry
// @route   POST /api/v1/contact
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    let newMessage;
    try {
      newMessage = await ContactMessage.create({
        name,
        email,
        subject: subject || 'General Inquiry',
        message
      });
    } catch (dbErr) {
      newMessage = {
        _id: 'msg_' + Date.now(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        status: 'Unread',
        createdAt: new Date()
      };
      memoryMessagesStore.unshift(newMessage);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry transmitted successfully to concierge & admin portal.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages for admin portal
// @route   GET /api/v1/contact
export const getContactMessages = async (req, res) => {
  try {
    let messages = [];
    try {
      messages = await ContactMessage.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      messages = memoryMessagesStore;
    }

    if (!messages || messages.length === 0) {
      messages = memoryMessagesStore;
    }

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update contact message status or send reply
// @route   PATCH /api/v1/contact/:id
export const updateContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    let updatedMsg;
    try {
      const msg = await ContactMessage.findById(id);
      if (msg) {
        if (status) msg.status = status;
        if (adminReply !== undefined) {
          msg.adminReply = adminReply;
          msg.repliedAt = new Date();
          msg.status = 'Replied';
        }
        updatedMsg = await msg.save();
      }
    } catch (dbErr) {}

    // Update in-memory fallback store as well
    const index = memoryMessagesStore.findIndex(m => m._id === id || m.id === id);
    if (index !== -1) {
      if (status) memoryMessagesStore[index].status = status;
      if (adminReply !== undefined) {
        memoryMessagesStore[index].adminReply = adminReply;
        memoryMessagesStore[index].status = 'Replied';
      }
    }

    res.status(200).json({
      success: true,
      data: updatedMsg || memoryMessagesStore[index] || { _id: id, status: status || 'Read', adminReply }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/v1/contact/:id
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await ContactMessage.findByIdAndDelete(id);
    } catch (dbErr) {}

    memoryMessagesStore = memoryMessagesStore.filter(m => m._id !== id && m.id !== id);

    res.status(200).json({
      success: true,
      message: 'Message removed successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
