import React, { useState, useEffect } from "react";
import Styles from "./Profile.module.css";
import InfoBar from "./InfoBar";
import { Button } from "react-bootstrap";
import UserQuotes from "./UsersQuotes/UsersQuotes";
import UserLikes from "./UserLikes/UserLikes";
import UserBookmarks from "./UserBookmarks/UserBookmarks";
import UserMore from "./UserMore/UserMore";
export default function Profile() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const handleClick = (index) => {
		setSelectedIndex(index);
	};
	const [user, setUser] = useState({
		username: "",
		email: "",
		quotes: "",
		notifications: "",
		inspires: "",
		followers: "",
	});
	useEffect(() => {
		fetch("http://localhost:5000/user/profile", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				res.json().then((jsonData) => {
					console.log(jsonData.data.user);
					const {
						_id,
						username,
						email,
						quotes,
						notifications,
						inspires,
						followers,
					} = jsonData.data.user;
					setUser({
						username: username,
						email: email,
						quotes: quotes,
						notifications: notifications,
						inspires: inspires,
						followers: followers,
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className={Styles.container}>
			<div className={Styles.section1}>
				<InfoBar></InfoBar>
			</div>

			<div className={Styles.section2}>
				<div className={Styles.Header}>
					<img
						src={
							"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
						}
						className={Styles.profilePicture}
					></img>
					<Button className={Styles.EditProfilebtn}>Edit Profile</Button>
				</div>
				<div className={Styles.content}>
					<div className={Styles.mainContent}>
						<div className={Styles.wrapper}>
							<h3 className={Styles.name}>{user.username}</h3>
							<p className={Styles.quotes}>{`${user.quotes} quotes`}</p>
							<p className={Styles.inspired}>
								{`${user.inspires} people have been spired by ${user.username}`}
							</p>
							<p className={Styles.inspired}>{`${user.followers} Followers`}</p>
						</div>
					</div>
					<div className={Styles.bottomNavbar}>
						<div
							onClick={() => {
								handleClick(0);
							}}
							className={Styles.btn}
						>
							Quotes
						</div>
						<div
							onClick={() => {
								handleClick(1);
							}}
							className={Styles.btn}
						>
							Likes
						</div>
						<div
							onClick={() => {
								handleClick(2);
							}}
							className={Styles.btn}
						>
							Bookmarks
						</div>
						<div
							onClick={() => {
								handleClick(3);
							}}
							className={Styles.btn}
						>
							More
						</div>
					</div>

					<div className={Styles.ContentDisplay}>
						{selectedIndex === 0 && <UserQuotes></UserQuotes>}
						{selectedIndex === 1 && <UserLikes></UserLikes>}
						{selectedIndex === 2 && <UserBookmarks></UserBookmarks>}
						{selectedIndex === 3 && <UserMore></UserMore>}
					</div>
				</div>
			</div>
		</div>
	);
}
