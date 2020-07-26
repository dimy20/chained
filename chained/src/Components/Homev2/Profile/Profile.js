import React, { useState, useEffect } from "react";
import Styles from "./Profile.module.css";
import InfoBar from "./InfoBar";
import { Button } from "react-bootstrap";
import UserQuotes from "./UsersQuotes/UsersQuotes";
import UserLikes from "./UserLikes/UserLikes";
import UserBookmarks from "./UserBookmarks/UserBookmarks";
import UserMore from "./UserMore/UserMore";
export default function Profile(props) {
	const { isUser, isProfile, userId } = props;
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
		followers: [],
		following: [],
	});
	const [following, setFollowing] = useState(false);

	const handleFollowClick = () => {
		fetch("http://localhost:5000/user/follow", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({
				userToFollowId: userId,
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetch("http://localhost:5000/user/isFollowedByLoggedUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({ userId: userId }),
		}).then((res) => {
			res.json().then((data) => {
				setFollowing(data.isFollowedByLoggedUser);
				console.log(data);
			});
		});
	}, []);

	useEffect(() => {
		let unmounted = false;
		if (isProfile) {
			fetch("http://localhost:5000/user/profile", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					res.json().then((jsonData) => {
						const {
							_id,
							username,
							email,
							quotes,
							notifications,
							inspires,
							followers,
							following,
						} = jsonData.data.user;
						if (!unmounted) {
							setUser({
								username: username,
								email: email,
								quotes: quotes,
								notifications: notifications,
								inspires: inspires,
								followers: followers,
								following: following,
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (isUser) {
			fetch(`http://localhost:5000/user/id/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					res.json().then((jsonData) => {
						const {
							_id,
							username,
							email,
							quotes,
							notifications,
							inspires,
							followers,
							following,
						} = jsonData.data.user;
						if (!unmounted) {
							setUser({
								username: username,
								email: email,
								quotes: quotes,
								notifications: notifications,
								inspires: inspires,
								followers: followers,
								following: following,
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}

		return () => {
			unmounted = true;
		};
	}, []);
	return (
		<div className={Styles.container}>
			{console.log(user.followers)}
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
							<p
								className={Styles.inspired}
							>{`${user.followers.length} Followers`}</p>

							{isUser && (
								<div
									style={{
										display: "flex",
										width: "34% ",
										justifyContent: "space-between",
									}}
								>
									<Button>Inspired</Button>
									{following && <Button>Unfollow</Button>}
									{!following && (
										<Button onClick={handleFollowClick}>Follow</Button>
									)}
								</div>
							)}
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
						{selectedIndex === 0 && <UserQuotes {...props}></UserQuotes>}
						{selectedIndex === 1 && <UserLikes></UserLikes>}
						{selectedIndex === 2 && <UserBookmarks></UserBookmarks>}
						{selectedIndex === 3 && <UserMore></UserMore>}
					</div>
				</div>
			</div>
		</div>
	);
}
