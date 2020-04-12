import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { AllConversations, Params } from "../../lib/types";
import { api } from "../../lib/API";
import "./Sidebar.styles.scss";
import { Conversations } from "../../containers/conversations.container";

export const Sidebar = () => {
	const { allConversations, loadConversations } = Conversations.useContainer();
	const params = useParams<Params>();
	const [opened, setOpened] = useState(false);
	const isMobile = window.innerWidth <= 750;

	// OLD WAY, NOW WE ARE USING THE UNSTATED NEXT LIB TO USE CONTEXT
	// const [allConversations, setAllConversations] = useState<AllConversations[]>(
	// 	[]
	// );
	// const getAllConversations = async () => {
	// 	const allConversations = await api.getAllConversations();
	// 	setAllConversations(allConversations);
	// };
	// useEffect(() => {
	// 	getAllConversations();
	// }, [params.conversationId]);

	useEffect(() => {
		loadConversations();
	}, []);

	const openNav = () => {
		console.log(opened);
		setOpened(!opened);
	};

	return (
		<aside>
			{opened || !isMobile ? (
				<div>
					<button className="aside__btn" onClick={openNav}>
						&times;
					</button>
					<h1>Chatty</h1>
					<Link className="aside__newBtn inside" to="/conversations/new">
						+
					</Link>
					<ul>
						{allConversations
							? allConversations.map((chat) => (
									<li key={chat.id}>
										<Link to={`/conversations/${chat.id}`}>
											<span>=> {chat.name}</span>
										</Link>
									</li>
							  ))
							: ""}
					</ul>
				</div>
			) : (
				<>
					<button className="aside__btn" onClick={openNav}>
						&#9776;
					</button>
					<h1>Chatty</h1>
					<Link className="aside__newBtn" to="/conversations/new">
						+
					</Link>
				</>
			)}
		</aside>
	);
};
