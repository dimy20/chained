import React from "react";
import Styles from "./MoreLikeThis.module.css";
import PinsDisplaySection from "./PinsDisplaySection/PinsDisplaySection";
export default function MoreLikeThis() {
	return (
		<div className={Styles.wrapper}>
			<h3 className={Styles.heading}>Mas como esto</h3>
			<PinsDisplaySection></PinsDisplaySection>
		</div>
	);
}
