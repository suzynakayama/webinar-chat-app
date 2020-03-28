import { Router } from 'express';
import { Message } from '../models/Message';

export const messagesRouter = Router();

// Create a conversation
messagesRouter.post('/', async (req, res, next) => {
  try {
    const message = new Message(req.body); // NOTE: THIS IS DANGEROUS
    await message.save();
    res.json(message);
  } catch (e) {
    next(e);
  }
});
