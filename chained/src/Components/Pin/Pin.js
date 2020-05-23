import React, { useState, useEffect, useRef } from "react";
import Styles from "./Pin.module.css";

import PinImg from "./PinImg/PinImg";
import PinPanel from "./PinPanel/PinPanel";
import MoreLikeThis from "./MoreLikeThis/MoreLikeThis";
import GoBackArrowIcon from "./../../devfiles/GoBackArrow.png";
const Pin = (props) => {
	const { history } = props;
	const [IsMouseOverPin, setIsMouseOverPin] = useState(false);
	const wrapperRef = useRef();
	const handleclick = () => {
		if (!IsMouseOverPin) {
			console.log("heyy");
			history.push({
				pathname: "/",
			});
		}
	};
	useEffect(() => {
		wrapperRef.current.addEventListener("click", handleclick);
		return () => wrapperRef.current.removeEventListener("click", handleclick);
	}, [wrapperRef, IsMouseOverPin]);

	return (
		<div>
			<div className={Styles.Wrapper}>
				<div ref={wrapperRef} className={Styles.container}>
					<button className={Styles.IconButton}>
						<img className={Styles.IconImg} src={GoBackArrowIcon}></img>
					</button>
					<div
						onMouseLeave={() => {
							setIsMouseOverPin(false);
						}}
						onMouseOver={() => {
							setIsMouseOverPin(true);
						}}
						className={Styles.pin}
					>
						<PinImg src={props.location.state.src}></PinImg>
						<PinPanel></PinPanel>
					</div>
				</div>
			</div>
			<MoreLikeThis></MoreLikeThis>
		</div>
	);
};
export default Pin;
