import React from "react";
import QuotesGrid from "../../QuotesGrid/QuotesGrid";
import Card from "../../../Card/Card";
import Styles from "./UserQuotes.module.css";
export default function UsersQuotes() {
	return (
		<div className={Styles.container}>
			<Card
				centered={true}
				width="92%"
				height="100%"
				username="Romina"
				quote="“I love you, not only for what you are, but for what I am when I am with you.”"
				tag="Love"
				quoteTittle="Love for all"
			></Card>
			<Card
				centered={true}
				width="92%"
				height="100%"
				username="Romina"
				quote="“I love you, not only for what you are, but for what I am when I am with you.”"
				tag="Love"
				quoteTittle="Love for all"
			></Card>
			<Card
				centered={true}
				width="90%"
				height="100%"
				username="Romina"
				quote="“I love you, not only for what you are, but for what I am when I am with you.”"
				tag="Love"
				quoteTittle="Love for all"
			></Card>
		</div>
	);
}
