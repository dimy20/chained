import React, { useEffect, useState } from "react";
import Styles from "./UserBookmarks.module.css";
import Card from "../../../Card/Card";
export default function UserBookmarks(props) {
	const { isProfile, isUser, userId } = props;
	const [bookmarks, setBookmarks] = useState([]);
	useEffect(() => {
		if (isProfile) {
			fetch("http://localhost:5000/bookmarks/profile", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.token}`,
				},
			})
				.then((res) => {
					res.json().then((data) => {
						console.log(data.bookmarks[0].quote);
						setBookmarks(data.bookmarks);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (isUser) {
			fetch(`http://localhost:5000/bookmarks/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					res.json().then((data) => {
						console.log(data);
						setBookmarks(data.bookmarks);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);
	return (
		<div className={Styles.contaier}>
			{bookmarks.map((q, index) => {
				return (
					<Card
						width="90%"
						heigth="90%"
						centered
						borderRadius="0 10px 10px 0"
						username={q.quote.author}
						quote={`“${q.quote.quote}”`}
						tag="Love"
						quoteTittle={q.quote.title}
					></Card>
				);
			})}
		</div>
	);
}
