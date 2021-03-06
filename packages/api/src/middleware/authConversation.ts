import { RequestHandler } from "express";
import { checkUserConvo } from '../lib/checkUserConvo';

// make sure the user can only see the conversations he is part of

export const middlewareConvo: RequestHandler = async (req, res, next) => {
  const { conversationID } = req.params;
  const userID = res.locals.user.id;
  try {
    await checkUserConvo(userID, conversationID);
  } catch (err) {
    next(err);
  }
  next()
}