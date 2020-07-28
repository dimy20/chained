import React, { useEffect } from "react";
import Styles from "./Bookmarks.module.css";
import Card from "../../../Card/Card";
export default function UserBookmarks(props) {
	const { bookmarks } = props;
	console.log(bookmarks);
	useEffect(() => {
		//FETCH FOR BOOKMAKRS -Fix this in user route!!
		//INSTEAD OF RETURING AN ARRAY CONATINING THE OBJECT IDS OF THE QUOTES,
		//RETURN THE QUTOES!!
	});
	return (
		<div className={Styles.contaier}>
			<h1>UserBookmarks</h1>
		</div>
	);
}
