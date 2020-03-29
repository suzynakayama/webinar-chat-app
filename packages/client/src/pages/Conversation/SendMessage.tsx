import React, { FormEvent, useRef } from "react";
import { api } from "../../lib/API";
import { Message } from "../../lib/types";

export interface SendMessageProps {
	conversationId: string;
	onNewMessage: (message: Message) => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({
	conversationId,
	onNewMessage
}) => {
	const input = useRef<HTMLInputElement>(null);

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		// console.log(input.current?.value);
		// exclamation mark (!) just say it actually does exist.
		const message = await api.createMessage(
			conversationId,
			input.current?.value!
		);
		onNewMessage(message);
		input.current!.value = "";
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' ref={input} />
			<button type='submit' onClick={handleSubmit}>
				<i className='fas fa-paper-plane'></i>
			</button>
		</form>
	);
};
