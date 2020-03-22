import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Conversation } from './Conversation';
import { User } from './User';

@Table
export class Message extends Model<Message> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID
    })
    id: string;

    @Column
    Message: string;

    @ForeignKey(() => Conversation)
    @Column
    conversationID: string;

    @ForeignKey(() => User)
    @Column
    userID: string;

    @BelongsTo(() => Conversation)
    conversation: Conversation;
};