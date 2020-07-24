import React from "react";
import Styles from "./Homev2.module.css";
import QuotesGrid from "./QuotesGrid/QuotesGrid";
export default function Homev2() {
	return (
		<div className={Styles.Container}>
			<div className={Styles.Items}></div>
			<div className={Styles.CenterColumn}>
				<QuotesGrid></QuotesGrid>
			</div>
			<div className={Styles.Items}></div>
		</div>
	);
}
