// import { Router } from 'express';
// // import { User } from '../models/User';
// // import { Conversation } from '../models/Conversation';
// import { Message } from '../models/Message';
// import { Conversation } from '../models/Conversation';

// export const conversationsRouter = Router();

// // get all conversations
// conversationsRouter.get('/', async (req, res) => {
//     const { userID } = req.params;
//     const conversations = await Conversation.findAll({ where: { userID } });
//     res.json(conversations);
// })

// // get one conversation
// conversationsRouter.get('/:conversationID', async (req, res) => {
//     const { conversationID } = req.params;
//     const conversation = await Conversation.findByPk(conversationID);
//     res.json(conversation);
// })

// // get all messages in a conversation
// conversationsRouter.get('/:conversationID', async (req, res) => {
//     const { conversationID } = req.params;
//     const messages = await Message.findAll({ where: { conversationID } });
//     res.json(messages);
// });