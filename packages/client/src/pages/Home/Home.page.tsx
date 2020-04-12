import React from "react";
import { Link } from "react-router-dom";
import "./home.page.scss";

export const HomePage = () => {
	return (
		<main className="home">
			<h1>Chatty</h1>
			<div className="home__options">
				<section className="home__signup">
					<h1>If you're new here</h1>
					<Link className="btn" to="/signup">
						Sign Up
					</Link>
				</section>

				<i className="far fa-comments home__icon"></i>

				<section className="home__login">
					<h1>If you're coming back</h1>
					<Link className="btn" to="/login">
						Login
					</Link>
				</section>
			</div>
		</main>
	);
};
