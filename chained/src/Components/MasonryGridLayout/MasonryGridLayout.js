import React from "react";
import Styles from "./MasonryGridLayout.module.css";
export default function MasonryGridLayout() {
	return (
		<div className={Styles.container}>
			<div className={Styles.Wrapper}>
				<div className={Styles.GridBox}>1</div>
				<div className={Styles.GridBox}>2</div>
				<div className={Styles.GridBox}>3</div>
				<div className={Styles.GridBox}>4</div>
				<div className={Styles.GridBox}>5</div>
				<div className={Styles.GridBox}>6</div>
				<div className={Styles.GridBox}>7</div>
				<div className={Styles.GridBox}>8</div>
				<div className={Styles.GridBox}>9</div>
				<div className={Styles.GridBox}>10</div>
				<div className={Styles.GridBox}>11</div>
				<div className={Styles.GridBox}>12</div>
				<div className={Styles.GridBox}>13</div>
				<div className={Styles.GridBox}>14</div>
			</div>
		</div>
	);
}
