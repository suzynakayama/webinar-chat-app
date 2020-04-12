import { Column, DataType, Model, Table, Unique, AllowNull, DeletedAt, BelongsToMany, IsEmail, Length } from 'sequelize-typescript';
import { Conversation } from './Conversation';
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class User extends Model<User> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID
    })
    id: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Unique
    @Column
    @IsEmail
    email: string;

    @AllowNull(false)
    @Column
    @Length({ max: 20, min: 6 })
    password: string;

    @DeletedAt
    deletionAt: Date;

    @BelongsToMany(() => Conversation, () => UserConversation)
    conversations: Conversation[];
};