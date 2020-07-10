import React from "react";
import { Button } from "react-bootstrap";
import Styles from "./Toolbar.module.css";
import { Avatar } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import formik from "formik";
import SearchBar from "./SearchBar/SearchBar";
//icons
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import SmsIcon from "@material-ui/icons/Sms";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import SettingsDropdown from "../SettingsDropdown/SettingsDropdown";
const Toolbar = (props) => {
	const { history } = props;
	const handleSiguiendoClick = () => {
		console.log("Click");
		history.push({
			pathname: "/following",
		});
	};
	return (
		<div className={Styles.container}>
			<div className={Styles.btnContainer}>
				<Button className={Styles.btn}>Logo</Button>
				<Button onClick={handleSiguiendoClick} className={Styles.btn}>
					Inicio
				</Button>{" "}
				<Button className={Styles.btn}>Siguiendo</Button>{" "}
			</div>

			<SearchBar></SearchBar>
			<div className={Styles.btnOptionesContainer}>
				<a href="#">
					<NotificationsNoneTwoToneIcon
						style={{ width: "30px", height: "30px", color: "white" }}
					></NotificationsNoneTwoToneIcon>
				</a>
				<a href="#">
					<SmsIcon
						style={{ width: "30px", height: "30px", color: "white" }}
					></SmsIcon>
				</a>
				<a href="#">
					<AccountCircleIcon
						style={{ width: "30px", height: "30px", color: "white" }}
					></AccountCircleIcon>
				</a>
				<SettingsDropdown></SettingsDropdown>
			</div>
		</div>
	);
};
export default Toolbar;
