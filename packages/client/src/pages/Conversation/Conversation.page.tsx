import React, { useState, useEffect } from "react";
import { api } from "../../lib/API";
import {
	AllConversations,
	Conversation,
	Message,
	Params
} from "../../lib/types";
import { useParams } from "react-router";
import { SendMessage } from "./SendMessage";
import { Aside } from "./Aside";
import "./conversation.page.scss";

export const ConversationPage = () => {
	const params = useParams<Params>();

	const [conversation, setConversation] = useState<Conversation>();
	const [allConversations, setAllConversations] = useState<AllConversations[]>(
		[]
	);
	const [messages, setMessages] = useState<Message[]>([]);

	const loadInitialData = async () => {
		const allConversations = await api.getAllConversations();
		setAllConversations(allConversations);
		const conversation = await api.getConversation(params.conversationId);
		if (!conversation) return;
		setConversation(conversation);
		const messages = await api.getMessages(params.conversationId);
		setMessages(messages);
	};

	useEffect(() => {
		loadInitialData();
	}, [params]);

	return (
		<main>
			<Aside allConversations={allConversations} />

			<header>
				{conversation ? (
					<>{conversation.name}</>
				) : (
					<h1>Conversation Not Found...</h1>
				)}
			</header>

			<ul className='chat'>
				{messages.map(msg => (
					<li key={msg.id} className='chat__li'>
						<span className='chat__span'>{msg.content}</span>
					</li>
				))}
			</ul>

			<footer>
				<SendMessage
					conversationId={params.conversationId}
					onNewMessage={message => {
						setMessages(m => [...m, message]);
					}}
				/>
			</footer>
		</main>
	);
};

// ux reasons, performance reasons (if page has lots of data,
// for example, it will refresh everything, so it will take time to fetch it again,
// Images are cache, so it really comes form memory)
