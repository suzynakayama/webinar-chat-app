import { Column, DataType, Model, Table, AllowNull, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Message } from './Message';
import { User } from './User';
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class Conversation extends Model<Conversation> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID
    })
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    // Setup relationship to users
    @BelongsToMany(() => User, () => UserConversation)
    users: User[];

    // Setup relationship to msgs
    @HasMany(() => Message)
    messages: Message[];
};