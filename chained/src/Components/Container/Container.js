import React from "react";
import Styles from "./Container.module.css";
export default function Container(props) {
	const { width, height, children } = props;
	return (
		<div style={{ width: width, height: height }} className={Styles.wrapper}>
			{children}
		</div>
	);
}
