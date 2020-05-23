import React from "react";
import Styles from "./PinsDisplaySection.module.css";
import Card from "../../../Home/Card/Card";
export default function PinsDisplaySection() {
	return (
		<div className={Styles.wrapper}>
			<Card></Card>
			{/* <Card></Card>
			<Card></Card>
			<Card></Card>
			<Card></Card> */}
		</div>
	);
}
