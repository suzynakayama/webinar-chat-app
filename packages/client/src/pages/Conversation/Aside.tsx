import React, { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface AsideProps {
	allConversations: any;
}

export const Aside: React.FC<AsideProps> = ({ allConversations }) => {
	const [opened, setOpened] = useState(false);
	const isMobile = window.innerWidth <= 750;

	const openNav = () => {
		console.log(opened);
		setOpened(!opened);
	};

	return (
		<aside>
			{opened || !isMobile ? (
				<div>
					<button className='aside__btn' onClick={openNav}>
						&times;
					</button>
					<h1>Chatty</h1>
					<ul>
						{allConversations.map(chat => (
							<li key={chat.id}>
								<Link to={`/conversations/${chat.id}`}>
									<span>{chat.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<>
					<button className='aside__btn' onClick={openNav}>
						&#9776;
					</button>
					<h1>Chatty</h1>
				</>
			)}
		</aside>
	);
};
