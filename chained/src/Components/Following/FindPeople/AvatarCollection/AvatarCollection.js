import React from "react";
import { Avatar } from "@material-ui/core";
import Styles from "./AvatarCollection.module.css";
export default function AvatarCollection(props) {
	const { amount } = props;
	let AvatarArrSize = [];
	for (let i = 0; i < amount; i++) {
		AvatarArrSize.push(0);
	}
	return (
		<div className={Styles.container}>
			{AvatarArrSize.map((a, index) => {
				return (
					<div key={index}>
						<a>
							<Avatar></Avatar>
						</a>
					</div>
				);
			})}
		</div>
	);
}
