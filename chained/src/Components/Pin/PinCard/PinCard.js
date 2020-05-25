import React, { useRef, useState, useEffect } from "react";
import Styles from "./PinCard.module.css";
import PinImg from "./PinImg/PinImg";
import PinPanel from "./PinPanel/PinPanel";
import GoBackArrowIcon from "../../../devfiles/GoBackArrow.png";
export default function PinCard(props) {
	const { history } = props;
	const [IsMouseOverPin, setIsMouseOverPin] = useState(false);
	const wrapperRef = useRef();
	const handleclick = () => {
		if (!IsMouseOverPin) {
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
						<PinImg src={history.location.state.src}></PinImg>
						<PinPanel></PinPanel>
					</div>
				</div>
			</div>
		</div>
	);
}
