import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/Home.page";
import LoginPage from "../pages/Login/Login.page";
import { ConversationPage } from "../pages/Conversation/Conversation.page";
import { api } from "../lib/API";

export const AppRouter = () => {
	const [loading, setLoading] = useState(true);

	const loadMe = async () => {
		await api.me();
		setLoading(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) setLoading(false);
		else loadMe();
	}, []);

	if (loading) return <span>Loading...</span>;

	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route
					exact
					path="/conversations/:conversationId"
					component={ConversationPage}
				/>
				<Route exact path="/login" component={LoginPage} />
			</Switch>
		</Router>
	);
};
