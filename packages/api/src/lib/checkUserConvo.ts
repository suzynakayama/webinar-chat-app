import { UserConversation } from "../models/UserConversation";

export const checkUserConvo = async (userId: string, conversationID: string) => {
    const exists = await UserConversation.findOne({
    where: {
      userId,
      conversationID
    }
  });
  if (!exists) throw new Error('You do not have permission to that conversation');
  return true;
}