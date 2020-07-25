import React from "react";
import Styles from "./Profile.module.css";
import InfoBar from "./InfoBar";
import { Button } from "react-bootstrap";
export default function Profile() {
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
						<h3 className={Styles.name}>Enzost4</h3>
						<p className={Styles.quotes}>20 quotes</p>
						<p className={Styles.inspired}>
							267 people have been spired by enzost4
						</p>
						<p className={Styles.inspired}>89 Followers</p>
					</div>
					<div className={Styles.bottomNavbar}></div>
				</div>
			</div>
			{/* <div className={Styles.container2}>
					<div className={Styles.wrapper2}>
						<a href="#">
							<img src="profile.jpeg" alt="" />
						</a>
						<div className={Styles.title}>Andrew Neil</div>
						<div className={Styles.place}>Surkhet, Nepal</div>
					</div>
					<div className={Styles.content}>
						<p>
							User Interface Designer and <br />
							front-end developer
						</p>
						<div className={Styles.buttons}>
							<div className={Styles.btn}>
								<button>Message</button>
							</div>
							<div className={Styles.btn}>
								<button>Following</button>
							</div>
						</div>
					</div>
					<div className={Styles.icons}>
						<li>
							<a href="#">
								<span className="fab fa-facebook-f"></span>
							</a>
						</li>
						<li>
							<a href="#">
								<span className="fab fa-twitter"></span>
							</a>
						</li>
						<li>
							<a href="#">
								<span className="fab fa-instagram"></span>
							</a>
						</li>
					</div>
				</div> */}
		</div>
	);
}
