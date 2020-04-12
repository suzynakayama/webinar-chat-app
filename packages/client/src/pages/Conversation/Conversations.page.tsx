import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../lib/API";
import { Conversation, Message, Params } from "../../lib/types";
import { useParams } from "react-router";
import "./conversation.page.scss";
import { CreateConversation } from "./CreateConversation";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const ConversationsPage = () => {
	const params = useParams<Params>();

	const [conversations, setConversations] = useState<Conversation>();

	// whenever the params.conversationId changes, check to see if we are creating new conversation
	const isNew = useMemo(
		() => params.conversationId === "new", //Returns boolean
		[params.conversationId]
	);

	const loadInitialData = async () => {
		if (isNew) return; // Don't load conversations if we are in the new conversation page

		const conversations = await api.getAllConversations();
		if (!conversations) return;
		setConversations(conversations);
	};

	useEffect(() => {
		loadInitialData();
	}, [params.conversationId]);

	if (!conversations && !isNew) return <span>Loading...</span>;

	return (
		<main>
			<Sidebar />
			{isNew ? <CreateConversation /> : null}
		</main>
	);
};

// ux reasons, performance reasons (if page has lots of data,
// for example, it will refresh everything, so it will take time to fetch it again,
// Images are cache, so it really comes form memory)
