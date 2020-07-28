import React, { useEffect, useState } from "react";
import QuotesGrid from "../../QuotesGrid/QuotesGrid";
import Card from "../../../Card/Card";
import Styles from "./UserQuotes.module.css";
import { date } from "joi";
export default function UsersQuotes(props) {
	const { isProfile, isUser, userId } = props;
	const [redirectTo, setRedirectTo] = useState("");
	// 1-> This is called when is logged in
	// 2-> This is called when is For an user
	const [quotes, setQuotes] = useState([]);
	useEffect(() => {
		if (isProfile) {
			setRedirectTo("/profile");
			fetch("http://localhost:5000/user/quotes", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.token}`,
				},
			})
				.then((res) => {
					res.json().then((data) => {
						setQuotes(data.quotes);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (isUser) {
			setRedirectTo("/user");
			fetch(`http://localhost:5000/user/quotes/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.token}`,
				},
			})
				.then((res) => {
					res.json().then((data) => {
						setQuotes(data.quotes);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		<div className={Styles.container}>
			{quotes.map((q, index) => {
				return (
					<Card
						quoteId={q._id}
						redirectTo={redirectTo}
						key={index}
						centered={true}
						width="92%"
						height="100%"
						username={q.author}
						quote={`“${q.quote}”`}
						tag="Love"
						quoteTittle={q.title}
					></Card>
				);
			})}
		</div>
	);
}
