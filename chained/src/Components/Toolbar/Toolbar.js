import React from "react";
import { Button } from "react-bootstrap";
import Styles from "./Toolbar.module.css";
import { Avatar } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import formik from "formik";
import SearchBar from "./SearchBar/SearchBar";
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
				<Avatar>H</Avatar>
				<Avatar>H</Avatar>
				<Avatar>H</Avatar>
				<Avatar>H</Avatar>
			</div>
		</div>
	);
};
export default Toolbar;
