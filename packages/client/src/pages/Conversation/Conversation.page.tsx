import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../lib/API";
import {
	AllConversations,
	Conversation,
	Message,
	Params,
} from "../../lib/types";
import { useParams } from "react-router";
import { SendMessage } from "./SendMessage";
import { Aside } from "./Aside";
import "./conversation.page.scss";
import { CreateConversation } from "./CreateConversation";

export const ConversationPage = () => {
	const params = useParams<Params>();

	const [conversation, setConversation] = useState<Conversation>();
	const [messages, setMessages] = useState<Message[]>([]);

	//whenever the params.conversationid changes, check to see if we are creating new conversation
	const isNew = useMemo(
		() => params.conversationId === "new", //Returns boolean
		[params.conversationId]
	);

	const loadInitialData = async () => {
		if (isNew) return;
		const conversation = await api.getConversation(params.conversationId);
		if (!conversation) return;
		setConversation(conversation);
		const messages = await api.getMessages(params.conversationId);
		setMessages(messages);
	};

	useEffect(() => {
		loadInitialData();
	}, [params.conversationId]);

	if (!conversation && !isNew) return <span>Loading...</span>;

	return (
		<main>
			<Aside />
			{isNew ? (
				<CreateConversation />
			) : (
				<>
					<header>
						{conversation ? (
							<>{conversation.name}</>
						) : (
							<h1>Conversation Not Found...</h1>
						)}
					</header>

					<ul className="chat">
						{messages.map((msg) => (
							<li key={msg.id} className="chat__li">
								<span className="chat__span">{msg.content}</span>
							</li>
						))}
					</ul>

					<footer>
						<SendMessage
							conversationId={params.conversationId}
							onNewMessage={(message) => {
								setMessages((m) => [...m, message]);
							}}
						/>
					</footer>
				</>
			)}
		</main>
	);
};

// ux reasons, performance reasons (if page has lots of data,
// for example, it will refresh everything, so it will take time to fetch it again,
// Images are cache, so it really comes form memory)
