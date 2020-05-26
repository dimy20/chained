import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Styles from "./Card.module.css";
import { Popover, OverlayTrigger, ListGroup } from "react-bootstrap";
const Card = (props) => {
	const { src, history, tags } = props;
	const [IsHovered, setIsHovered] = useState(false);
	const handleOnMouseOver = () => {
		setIsHovered(true);
	};
	const handleOnMouseLeave = () => {
		setIsHovered(false);
	};

	const handleCardClick = () => {
		history.push({
			pathname: "/pin",
			state: { src: src, tags: tags },
		});
	};

	const popover = (
		<Popover id="popover-basic">
			<Popover.Title as="h2">
				This pin is based on your recent activity
			</Popover.Title>
			<Popover.Content>
				<div className={Styles.testContainer}>
					<ListGroup.Item className={Styles.test} action href="#link1">
						Hide pin
					</ListGroup.Item>
					<ListGroup.Item className={Styles.test} action href="#link1">
						Download image
					</ListGroup.Item>
					<ListGroup.Item className={Styles.test} action href="#link1" s>
						Report pin
					</ListGroup.Item>
				</div>
			</Popover.Content>
		</Popover>
	);

	return (
		<div
			onClick={handleCardClick}
			onMouseLeave={handleOnMouseLeave}
			onMouseOver={handleOnMouseOver}
			className={Styles.Wrapper}
		>
			<img
				className={IsHovered ? Styles.imgOnHover : Styles.img}
				src={src}
				height="200px"
			></img>
			<div className={Styles.container}>
				{IsHovered && <button className={Styles.ShareButton}>___</button>}

				{IsHovered && (
					<OverlayTrigger trigger="click" placement="right" overlay={popover}>
						<button className={Styles.OptionsButton}>...</button>
					</OverlayTrigger>
				)}

				{IsHovered && (
					<button className={Styles.GuardarButtonVisible}>GUARDAR</button>
				)}
			</div>
		</div>
	);
};
export default Card;
