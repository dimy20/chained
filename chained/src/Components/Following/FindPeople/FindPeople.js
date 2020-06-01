import React from "react";
import Styles from "./FindPeople.module.css";
import AvatarCollection from "./AvatarCollection/AvatarCollection";
import { Carousel } from "react-bootstrap";
export default function FindPeople() {
	return (
		<div className={Styles.container}>
			<h3 className={Styles.heading}>De personas a las que sigues</h3>
			<div className={Styles.innerContainer}>
				<Carousel indicators={false}>
					<Carousel.Item>
						<div style={{ display: "flex" }}>
							<AvatarCollection amount={7}></AvatarCollection>
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<div style={{ display: "flex" }}>
							<AvatarCollection amount={7}></AvatarCollection>
						</div>
					</Carousel.Item>
				</Carousel>

				<button className={Styles.Button}>
					Encuentra a personas que seguir
				</button>
			</div>
		</div>
	);
}
