import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import Styles from "./QuotesGrid.module.css";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
export default function QuotesColumns(props) {
	const [quotes, setQuotes] = useState([]);
	useEffect(() => {
		let unmounted = false;
		fetch("http://localhost:5000/quote/id/5f1f817e42cb613290046d5b", {
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
							<div key={index} className={Styles.wrapper}>
								<ProfilePicture user={q.user}></ProfilePicture>
								<Card
									quoteId={q._id}
									borderRadius="0 10px 10px 0"
									username={q.author}
									quote={`“${q.quote}”`}
									tag="Love"
									quoteTittle={q.title}
								></Card>
							</div>
						);
					})}
				</div>
			}
			{/* <Redirect to="/user"></Redirect> */}
			{console.log(quotes)}
		</div>
	);
}
