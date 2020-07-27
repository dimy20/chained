import React, { useState, useEffect } from "react";
import Styles from "./Card.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Redirect } from "react-router-dom";
import { Popover } from "@material-ui/core";
export default function MyCard(props) {
	const {
		borderRadius,
		centered,
		height,
		width,
		username,
		quoteTittle,
		quote,
		tag,
	} = props;

	const [bookmarkBtn, setbookmarkBtn] = useState({
		qty: 0,
		isClicked: false,
	});
	const [likesBtn, setLikesBtn] = useState({
		qty: 0,
		isClicked: false,
	});

	const handleLikesClick = () => {
		setLikesBtn({
			...likesBtn,
			isClicked: true,
		});
	};
	const handleBookmarkClick = () => {
		setbookmarkBtn({
			...bookmarkBtn,
			isClicked: true,
		});
	};

	let center = null;
	if (centered) {
		center = "center";
	}

	return (
		<div
			style={{
				width: width,
				height: height,
				justifySelf: center,
				borderRadius: borderRadius,
			}}
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
					<div className={Styles.innerElement}>
						{bookmarkBtn.isClicked ? (
							<BookmarkIcon
								onClick={() =>
									setbookmarkBtn((prev) => {
										return {
											...prev,
											isClicked: !prev.isClicked,
										};
									})
								}
								className={Styles.IconBtn}
							></BookmarkIcon>
						) : (
							<BookmarkBorderIcon
								onClick={handleBookmarkClick}
								className={Styles.IconBtn}
							></BookmarkBorderIcon>
						)}
						<p className={Styles.number}>{bookmarkBtn.qty}</p>
					</div>
					<div className={Styles.innerElement}>
						{likesBtn.isClicked ? (
							<FavoriteIcon
								onClick={() =>
									setLikesBtn((prev) => {
										return {
											...prev,
											isClicked: !prev.isClicked,
										};
									})
								}
								className={Styles.IconBtn}
							></FavoriteIcon>
						) : (
							<FavoriteBorderIcon
								onClick={handleLikesClick}
								className={Styles.IconBtn}
							></FavoriteBorderIcon>
						)}

						<p className={Styles.number}>{likesBtn.qty}</p>
					</div>
					<div className={Styles.innerElement}>
						<VisibilityIcon style={{ color: "#127ba3" }}></VisibilityIcon>
						<p className={Styles.number1}>0</p>
					</div>
				</div>
			</div>
		</div>
	);
}
