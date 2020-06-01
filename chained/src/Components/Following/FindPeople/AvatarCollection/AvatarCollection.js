import React from "react";
import Avatar from "../../../Avatar/Avatar";
import Styles from "./AvatarCollection.module.css";
import axios from "axios";
export default function AvatarCollection(props) {
	const { amount } = props;
	let AvatarArrSize = [];
	for (let i = 0; i < amount; i++) {
		AvatarArrSize.push(0);
	}
	const handleClick = () => {
		console.log("Clickeasdasd");
	};
	return (
		<div onClick={handleClick} className={Styles.container}>
			{AvatarArrSize.map((a, index) => {
				return (
					<div key={index}>
						<Avatar></Avatar>
					</div>
				);
			})}
		</div>
	);
}
