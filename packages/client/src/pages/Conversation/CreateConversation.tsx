import React, { useRef, FormEvent, useState } from "react";
import { api } from "../../lib/API";
import { Redirect } from "react-router";
import { Conversation } from "../../lib/types";
import { Conversations } from "../../containers/conversations.container";

export const CreateConversation = () => {
	const input = useRef<HTMLInputElement>(null);
	const [conversation, setConversation] = useState<Conversation>();

	const { createConversation } = Conversations.useContainer();

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		const conv = await createConversation(input.current?.value!);
		setConversation(conv);
	};

	if (conversation)
		return <Redirect to={`/conversations/${conversation.id}`} />;

	return (
		<header className="create">
			<form onSubmit={handleSubmit}>
				<input
					className="create__input"
					type="text"
					name="name"
					placeholder="New Conversation"
					ref={input}
				/>
				<button type="submit" className="create__btn">
					Create
				</button>
			</form>
		</header>
	);
};
