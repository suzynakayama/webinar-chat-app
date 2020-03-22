import { Column, DataType, Model, Table, Unique, AllowNull, DeletedAt, ForeignKey } from 'sequelize-typescript';
import { Conversation } from './Conversation';

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
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @DeletedAt
    deletionAt: Date;

    @ForeignKey(() => Conversation)
    @Column
    conversationID: string;
};