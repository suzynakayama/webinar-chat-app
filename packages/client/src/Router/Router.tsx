import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/Home.page";
import LoginPage from "../pages/Login/Login.page";
import SignupPage from "../pages/Signup/Signup.page";
import { ConversationPage } from "../pages/Conversation/Conversation.page";
import { api } from "../lib/API";
import { ConversationsPage } from "../pages/Conversation/Conversations.page";

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
				<Route exact path="/conversations" component={ConversationsPage} />
				<Route
					exact
					path="/conversations/:conversationID"
					component={ConversationPage}
				/>
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignupPage} />
			</Switch>
		</Router>
	);
};
