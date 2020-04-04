import React, { FormEvent, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AllConversations } from "../../lib/types";
import { api } from "../../lib/API";

export interface AsideProps {
	allConversations: any;
}

export const Aside: React.FC<AsideProps> = () => {
	const [opened, setOpened] = useState(false);
	const isMobile = window.innerWidth <= 750;
	const [allConversations, setAllConversations] = useState<AllConversations[]>(
		[]
	);

	const getAllConversations = async () => {
		const allConversations = await api.getAllConversations();
		setAllConversations(allConversations);
	};

	useEffect(() => {
		getAllConversations();
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

					<Link className="aside__newBtn" to="/conversations/new">
						+
					</Link>

					<ul>
						{allConversations.map((chat) => (
							<li key={chat.id}>
								<Link to={`/conversations/${chat.id}`}>
									<span>=> {chat.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<>
					<button className="aside__btn" onClick={openNav}>
						&#9776;
					</button>
					<h1>Chatty</h1>
				</>
			)}
		</aside>
	);
};
