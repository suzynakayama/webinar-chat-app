import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/Home.page";
import { ConversationPage } from "../pages/Conversation/Conversation.page";

export const AppRouter = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route
					exact
					path='/conversations/:conversationId'
					component={ConversationPage}
				/>
			</Switch>
		</Router>
	);
};
