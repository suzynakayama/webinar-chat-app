import { Column, DataType, Model, Table, AllowNull, HasMany } from 'sequelize-typescript';
import { Message } from './Message';
import { User } from './User';

@Table
export class Conversation extends Model<Conversation> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID
    })
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    // @HasMany(() => User)
    // user: User[];

    @HasMany(() => Message)
    message: Message[];
};