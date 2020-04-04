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
		setConversation(conv);
	};

	if (conversation)
		return <Redirect to={`/conversations/${conversation.id}`} />;

	return (
		<header>
			Create new Conversation
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="New Conversation"
					ref={input}
				/>
				<button>Create</button>
			</form>
		</header>
	);
};
