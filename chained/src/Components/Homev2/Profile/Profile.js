import React, { useState, useEffect } from "react";
import Styles from "./Profile.module.css";
import InfoBar from "./InfoBar";
import { Button } from "react-bootstrap";
import UserQuotes from "./UsersQuotes/UsersQuotes";
import UserLikes from "./UserLikes/UserLikes";
import UserBookmarks from "./UserBookmarks/UserBookmarks";
import UserMore from "./UserMore/UserMore";
import useAsyncData from "./useAsyncData";
export default function Profile(props) {
	const { isUser, isProfile, userId } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [{ data, isLoading, isError }, dFetch] = useAsyncData(
		null,
		"http://localhost:5000/user/following"
	);
	if (data) {
		console.log(data.following.length);
	}

	//const [ProfileImage, setProfileImage] = useState("");
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

	const handleUnFollowClick = () => {
		fetch("http://localhost:5000/user/unFollow", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify({
				userToUnfollow: userId,
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					setFollowing(false);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
					setFollowing(true);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (isUser) {
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
				});
			});
		}
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
			<div className={Styles.section1}>
				<InfoBar></InfoBar>
			</div>

			<div className={Styles.section2}>
				<div className={Styles.Header}>
					<img
						src={"https://clikiads.com/static/images/blank_profile.png"}
						className={Styles.profilePicture}
					></img>
					<Button className={Styles.EditProfilebtn}>Edit Profile</Button>
				</div>
				<div className={Styles.content}>
					<div className={Styles.mainContent}>
						<div className={Styles.wrapper}>
							<h3 className={Styles.name}>{user.username}</h3>
							<p className={Styles.quotes}>{`${user.quotes} quotes`}</p>
							{data ? (
								<p
									className={Styles.inspired}
								>{`Following : ${data.following.length} `}</p>
							) : (
								<p className={Styles.inspired}>{`Following : 0`}</p>
							)}

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
									{following && (
										<Button onClick={handleUnFollowClick}>Unfollow</Button>
									)}
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
						{selectedIndex === 2 && (
							<UserBookmarks
								isUser={isUser}
								isProfile={isProfile}
								userId={userId}
							></UserBookmarks>
						)}
						{selectedIndex === 3 && <UserMore></UserMore>}
					</div>
				</div>
			</div>
		</div>
	);
}
