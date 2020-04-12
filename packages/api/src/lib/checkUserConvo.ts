import { UserConversation } from "../models/UserConversation";

export const checkUserConvo = async (userID: string, conversationID: string) => {
    const exists = await UserConversation.findOne({
    where: {
      userID,
      conversationID
    }
  });
  if (!exists) throw new Error('You do not have permission to that conversation');
  return true;
}