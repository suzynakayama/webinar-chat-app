import React, { useRef, FormEvent, useState } from "react";
import { api } from "../../lib/API";
import { Redirect } from "react-router";
import "./login.page.scss";

const LoginPage = () => {
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<boolean>();
	const [loggedIn, setLoggedIn] = useState(false);

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		evt.stopPropagation();

		// reset the error on multiple login attempts
		setError(false);

		const data = await api.login(
			emailInput.current!.value!,
			passwordInput.current!.value!
		);

		// if not token, set error to true
		if (!data) return setError(true);

		setLoggedIn(true);
		localStorage.setItem("token", data.token);
	};

	if (loggedIn) return <Redirect to="/conversations" />;

	return (
		<main className="login">
			<form onSubmit={handleSubmit}>
				<h1>Chatty</h1>
				{error && <span className="error">Incorrect login details</span>}
				<input type="text" name="email" placeholder="Email" ref={emailInput} />
				<input
					type="password"
					name="password"
					placeholder="Password"
					ref={passwordInput}
				/>
				<button>Login</button>
			</form>
		</main>
	);
};

export default LoginPage;
