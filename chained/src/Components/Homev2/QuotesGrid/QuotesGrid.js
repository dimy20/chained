import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import Styles from "./QuotesGrid.module.css";

export default function QuotesColumns(props) {
	const [quotes, setQuotes] = useState([]);
	useEffect(() => {
		let unmounted = false;
		fetch("http://localhost:5000/quote/id/5f1cfb927103021128c36641", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				res.json().then((data) => {
					if (!unmounted) {
						setQuotes([...quotes, data.quote]);
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});

		return () => {
			unmounted = true;
		};
	}, []);
	return (
		<div>
			{
				<div className={Styles.container}>
					{quotes.map((q, index) => {
						return (
							<Card
								user={q.user}
								key={index}
								redirectTo="/user"
								username={q.author}
								quote={`“${q.quote}”`}
								tag="Love"
								quoteTittle={q.title}
							></Card>
						);
					})}
				</div>
			}
			{/* <Redirect to="/user"></Redirect> */}
			{console.log(quotes)}
		</div>
	);
}
