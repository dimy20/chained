import React, { useEffect } from "react";
import Avatar from "../../../Avatar/Avatar";
import Styles from "./AvatarCollection.module.css";
import axios from "axios";
export default function AvatarCollection(props) {
	useEffect(() => {
		axios({
			method: "GET",
			url: `https://pixabay.com/api/?key=16381049-c197cfa5caeabac8c93d8da2c&q=${""}&image_type=photo&per_page=${2}&page=${1}`,
		}).then((res) => {
			console.log(res);
		});
	}, []);

	const { amount } = props;
	let AvatarArrSize = [];
	for (let i = 0; i < amount; i++) {
		AvatarArrSize.push(0);
	}
<<<<<<< HEAD
	return (
		<div className={Styles.container}>
=======
	const handleClick = () => {
		console.log("Clickeasdasd");
	};
	return (
		<div onClick={handleClick} className={Styles.container}>
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473
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
