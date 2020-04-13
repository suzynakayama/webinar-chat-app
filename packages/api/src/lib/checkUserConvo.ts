import { UserConversation } from "../models/UserConversation";

export const checkUserConvo = async (userID: string, conversationID: string) => {
  let exists;
  try {
    exists = await UserConversation.findOne({
      where: {
        userID,
        conversationID
      }
    });
  } catch (err) {
    console.log(err);
    if (!exists) throw new Error('You do not have permission to that conversation');
  }
  return true;
};
