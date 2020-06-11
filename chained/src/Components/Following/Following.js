import React from "react";
import Styles from "./Following.module.css";
import FetchImagesFromApi from "../FetchImagesFromApi/FetchImagesFromApi";
import CardCollection from "../CardCollection/CardCollection";
import FindPeople from "./FindPeople/FindPeople";
export default function Following() {
	return (
		<div className={Styles.wrapper}>
			<div className={Styles.container}>
				<FindPeople></FindPeople>
			</div>
		</div>
	);
}
