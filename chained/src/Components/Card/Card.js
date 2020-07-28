import React, { useState, useEffect } from "react";
import Styles from "./Card.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Redirect } from "react-router-dom";
import { Popover } from "@material-ui/core";
import { json } from "body-parser";
export default function MyCard(props) {
	const {
		quoteId,
		borderRadius,
		centered,
		height,
		width,
		username,
		quoteTittle,
		quote,
		tag,
	} = props;
	//const [isFollowedByLoggedUser, setisFollowedByLoggedUser] = useState(false);
	const [bookmarkBtn, setbookmarkBtn] = useState({
		qty: 0,
		isClicked: false,
	});
	const [likesBtn, setLikesBtn] = useState({
		qty: 0,
		isClicked: false,
	});
	useEffect(() => {
		fetch("http://localhost:5000/quote/isLikedByLoggedUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }),
		})
			.then((res) => {
				res.json().then((data) => {
					console.log(data);
					setLikesBtn({
						qty: data.likesQty,
						isClicked: data.isLikedByLoggedUser,
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const handleLikesClick = () => {
		fetch("http://localhost:5000/quote/incLikes", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }),
		})
			.then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
		setLikesBtn((prev) => {
			return {
				qty: prev.qty + 1,
				isClicked: true,
			};
		});
	};
	const handleUnlikeClick = () => {
		fetch("http://localhost:5000/quote/removeLike", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }),
		})
			.then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});

		setLikesBtn((prev) => {
			return {
				isClicked: prev.qty - 1,
				isClicked: !prev.isClicked,
			};
		});
	};
	const handleBookmarkClick = () => {
		//FETCH
		fetch("http://localhost:5000/user/addToBookmarks", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }), // route needs the id to perfom queries
		})
			.then((res) => {
				res.json().then((data) => {
					//Updates states
					setbookmarkBtn({
						...bookmarkBtn,
						isClicked: true,
					});
					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleBookmarkUnclik = () => {
		//FETCH
		fetch("http://localhost:5000/user/removeFromBookmarks", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }), // route needs the id to perfom queries
		})
			.then((res) => {
				res.json().then((data) => {
					//Updates states
					setbookmarkBtn((prev) => {
						return {
							...prev,
							isClicked: !prev.isClicked,
						};
					});
					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	//CHECK IF USER HAS THIS QUOTE IN BOOKMARKS OR NOT, TO RENDER THE CORRECT ICON ON MOUNTING
	useEffect(() => {
		fetch("http://localhost:5000/user/isQuoteInBookmarks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ quoteId: quoteId }),
		})
			.then((res) => {
				res.json().then((data) => {
					setbookmarkBtn({
						...bookmarkBtn,
						isClicked: data.isQuoteInBookmarks,
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
								onClick={handleBookmarkUnclik}
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
								onClick={handleUnlikeClick}
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
