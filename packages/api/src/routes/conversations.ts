import { Router } from 'express';
// import { User } from '../models/User';
// import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

export const conversationsRouter = Router();

// get all messages in a conversation
conversationsRouter.get('/', async (req, res) => {
    const { conversationID } = req.params;
    const messages = await Message.findAll({ where: { conversationID } });
    res.json(messages);
});