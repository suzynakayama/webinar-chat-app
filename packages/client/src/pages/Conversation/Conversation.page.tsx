import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../lib/API";
import { Conversation, Message, Params } from "../../lib/types";
import { useParams } from "react-router";
import { SendMessage } from "./SendMessage";
import "./conversation.page.scss";
import { CreateConversation } from "./CreateConversation";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const ConversationPage = () => {
	const params = useParams<Params>();

	const [conversation, setConversation] = useState<Conversation>();
	const [messages, setMessages] = useState<Message[]>([]);

	// whenever the params.conversationId changes, check to see if we are creating new conversation
	const isNew = useMemo(
		() => params.conversationID === "new", //Returns boolean
		[params.conversationID]
	);

	const loadInitialData = async () => {
		if (isNew) return; // Don't load conversations if we are in the new conversation page
		const conversation = await api.getConversation(params.conversationID);
		if (!conversation) return;
		const messages = await api.getMessages(params.conversationID);
		setConversation(conversation);
		if (messages) {
			setMessages(messages);
		}
	};

	useEffect(() => {
		loadInitialData();
	}, [params.conversationID]);

	if (!conversation && !isNew) return <span>Loading...</span>;

	return (
		<main>
			<Sidebar />
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
						{messages.length
							? messages.map((msg) => {
									console.log("msg", msg);
									return (
										<li key={msg.id} className="chat__li">
											<span className="chat__span">{msg.content}</span>
										</li>
									);
							  })
							: ""}
					</ul>

					<footer>
						<SendMessage
							conversationID={params.conversationID}
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
