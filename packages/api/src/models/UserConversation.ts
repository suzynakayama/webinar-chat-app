import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Conversation } from './Conversation';
import { User } from './User';


// joining table to join users and conversations -->
// Many to Many relationship. One user can have many
// conversations and a conversation can have many users
@Table
export class UserConversation extends Model<UserConversation> {

  @ForeignKey(() => User)
  @Column
  userID: string;

  @ForeignKey(() => Conversation)
  @Column
  conversationID: string;
};