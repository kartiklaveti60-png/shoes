import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true
    },
    subject: {
      type: String,
      default: 'General Inquiry'
    },
    message: {
      type: String,
      required: [true, 'Message body is required']
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Replied'],
      default: 'Unread'
    },
    adminReply: {
      type: String,
      default: ''
    },
    repliedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
