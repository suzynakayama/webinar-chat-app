import { Router } from 'express';
import { Message } from '../models/Message';
import { checkUserConvo } from '../lib/checkUserConvo';

export const messagesRouter = Router();

// Create a conversation
messagesRouter.post('/', async (req, res, next) => {
  try {
    checkUserConvo(res.locals.user.id, req.body.conversationID);
    const { content, userID, conversationID } = req.body;
    const message = new Message({ content, userID, conversationID });
    await message.save();
    res.json(message);
  } catch (e) {
    next(e);
  }
});
