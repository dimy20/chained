<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import Styles from "./FindPeople.module.css";
import AvatarCollection from "./AvatarCollection/AvatarCollection";
import { Carousel } from "react-bootstrap";
import MyModal from "../../MyModal/MyModal";
//Context
import PeopleYouFollowContext from "../../../Contexts/PeopleYouFollowContext";
import FindPeopleContext from "../../../Contexts/FindPeopleContext";
export default function FindPeople() {
	const { IsPeopleYouFollowOpen, setIsPeopleYouFollowOpen } = useContext(
		PeopleYouFollowContext
	);
	const { IsFindPeopleOpen, setIsFindPeopleOpen } = useContext(
		FindPeopleContext
	);
	const handleFindPeopleClick = () => {
		setIsFindPeopleOpen(true);
	};
	const handleEditClick = () => {
		setIsPeopleYouFollowOpen(true);
	};
	const handleEditClose = () => {
		setIsPeopleYouFollowOpen(false);
	};
	const handleFindPeopleClose = () => {
		setIsFindPeopleOpen(false);
	};
=======
import React from "react";
import Styles from "./FindPeople.module.css";
import AvatarCollection from "./AvatarCollection/AvatarCollection";
import { Carousel } from "react-bootstrap";
export default function FindPeople() {
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473
	return (
		<div className={Styles.container}>
			<h3 className={Styles.heading}>De personas a las que sigues</h3>
			<div className={Styles.innerContainer}>
				<Carousel indicators={false}>
					<Carousel.Item>
						<div style={{ display: "flex" }}>
							<AvatarCollection amount={7}></AvatarCollection>
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<div style={{ display: "flex" }}>
							<AvatarCollection amount={7}></AvatarCollection>
						</div>
					</Carousel.Item>
				</Carousel>

				<button onClick={handleFindPeopleClick} className={Styles.Button}>
					Find People you can follow
				</button>
			</div>
			<div className={Styles.row2}>
				<div onClick={handleEditClick} className={Styles.EditButton}>
					<p>Edit</p>
				</div>
				<input
					className={Styles.SearchFollowed}
					type="text"
					placeholder="Search"
				></input>
			</div>
			<MyModal
				open={IsPeopleYouFollowOpen}
				handleClose={handleEditClose}
				header="Edit who you follow"
			></MyModal>
			<MyModal
				open={IsFindPeopleOpen}
				handleClose={handleFindPeopleClose}
				header="Find new people"
			></MyModal>
				<button className={Styles.Button}>
					Encuentra a personas que seguir
				</button>
			</div>
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473
		</div>
	);
}
