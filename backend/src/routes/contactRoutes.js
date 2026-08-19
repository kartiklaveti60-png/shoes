import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .post(createContactMessage)
  .get(getContactMessages);

router.route('/:id')
  .patch(updateContactMessage)
  .delete(deleteContactMessage);

export default router;
