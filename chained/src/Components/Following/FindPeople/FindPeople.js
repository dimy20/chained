import React from "react";
import Styles from "./FindPeople.module.css";
import AvatarCollection from "./AvatarCollection/AvatarCollection";
export default function FindPeople() {
	return (
		<div className={Styles.container}>
			<h3>De personas a las que sigues</h3>
			<div>
				<AvatarCollection amount={5}></AvatarCollection>
				<button>Encuentra a personas que seguir</button>
			</div>
		</div>
	);
}
