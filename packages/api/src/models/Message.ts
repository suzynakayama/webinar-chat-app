import { Column, DataType, Model, Table, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Conversation } from './Conversation';
import { User } from './User';


// One to Many relationship. One msg belongs to a conversation, but a conversation can have many msgs.
@Table({ paranoid: true })
export class Message extends Model<Message> {
	@Column({
	defaultValue: DataType.UUIDV4,
	primaryKey: true,
	type: DataType.UUID
	})
	id: string;

	@AllowNull(false)
	@Column
	content: string;

	// column of the conversation id itself
	@AllowNull(false)
	@ForeignKey(() => User)
	@Column
	userId: string; // who sent the msg

	// for Sequelize to create a one to many relationship
	@BelongsTo(() => Conversation)
	user: User;

	@ForeignKey(() => Conversation)
	@Column
	conversationId: string;
};