import React, { useRef, FormEvent, useState } from "react";
import { api } from "../../lib/API";
import { Redirect } from "react-router";
import { Conversation } from "../../lib/types";

export const CreateConversation = () => {
	const input = useRef<HTMLInputElement>(null);
	const [conversation, setConversation] = useState<Conversation>();

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		const conv = await api.createConversation(input.current?.value!);
		console.log(input.current?.value);
		console.log(conv);
		setConversation(conv);
		console.log(conversation);
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
