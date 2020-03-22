import { Column, DataType, Model, Table, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

    @AllowNull(false)
    @Column
    Message: string;

    @ForeignKey(() => Conversation)
    @AllowNull(false)
    @Column
    conversationID: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userID: string;

    @BelongsTo(() => Conversation)
    @AllowNull(false)
    @Column
    conversation: Conversation;
};