import React from "react";
import Styles from "./PinPanel.module.css";
import Tab from "../../Tab/Tab";
import Share from "../../../../devfiles/redes-sociales.png";
import Flechas from "../../../../devfiles/multimedia.png";
import { Avatar } from "@material-ui/core";

export default function PinPanel() {
	return (
		<div className={Styles.container}>
			<div className={Styles.ButtonsContainer}>
				<div className={Styles.optionsButtonsContainer}>
					<button className={Styles.ShareButton}>
						<img src={Share}></img>
					</button>

					<button className={Styles.optionsButton}>
						<img src={Flechas}></img>
					</button>
				</div>
				<button className={Styles.GuardarButton}>Guardar</button>
			</div>
			<Tab></Tab>
		</div>
	);
}
