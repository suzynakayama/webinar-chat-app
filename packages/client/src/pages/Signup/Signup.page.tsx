import React, { useRef, FormEvent, useState } from "react";
import { api } from "../../lib/API";
import { Redirect } from "react-router";
import "./Signup.page.scss";

const SignupPage = () => {
	const firstNameInput = useRef<HTMLInputElement>(null);
	const lastNameInput = useRef<HTMLInputElement>(null);
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<boolean>();
	const [loggedIn, setLoggedIn] = useState(false);

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		evt.stopPropagation();

		// Reset the error on multiple login attempts
		setError(false);

		await api.signup(
			firstNameInput.current!.value!,
			lastNameInput.current!.value!,
			emailInput.current!.value!,
			passwordInput.current!.value!
		);

		const data = await api.login(
			emailInput.current!.value!,
			passwordInput.current!.value!
		);

		// If no token, set error to true
		if (!data) setError(true);
		setLoggedIn(true);
		localStorage.setItem("token", data.token);
	};

	if (loggedIn) return <Redirect to="/conversations" />;

	return (
		<main className="login">
			<form onSubmit={handleSubmit}>
				<h1>Chatty</h1>
				{error && <span className="error">Could not Signup</span>}
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					ref={firstNameInput}
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					ref={lastNameInput}
				/>
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

export default SignupPage;
