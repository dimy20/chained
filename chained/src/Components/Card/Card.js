import React, { useState } from "react";
import Styles from "./Card.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Redirect } from "react-router-dom";

export default function MyCard(props) {
	const {
		user,
		redirectTo,
		centered,
		height,
		width,
		username,
		quoteTittle,
		quote,
		tag,
	} = props;

	const [redirect, setRedirect] = useState(false);

	let center = null;
	if (centered) {
		center = "center";
	}
	return (
		<div
			onClick={() => setRedirect(true)}
			style={{ width: width, height: height, justifySelf: center }}
			className={Styles.wrapper}
		>
			<div className={Styles.section1}>
				<p className={Styles.header}>{tag}</p>
				<h2 className={Styles.h2}>{quoteTittle}</h2>
				<p className={Styles.adjective}>{username}</p>
				<p className={Styles.quote}>{quote}</p>
			</div>

			<div className={Styles.section2}>
				<div className={Styles.bar}>
					<BookmarkIcon style={{ color: "#127ba3" }}></BookmarkIcon>
					<FavoriteIcon style={{ color: "#127ba3" }}></FavoriteIcon>
					<VisibilityIcon style={{ color: "#127ba3" }}></VisibilityIcon>
				</div>
			</div>
			{redirect && (
				<Redirect
					to={{
						pathname: redirectTo,
						state: {
							user: user,
						},
					}}
				></Redirect>
			)}
		</div>
	);
}
