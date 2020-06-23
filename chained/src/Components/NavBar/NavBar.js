import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Styles from "./NavBar.module.css";

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	const element = <div>{children}</div>;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && element}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [CurrentValue, setCurrentValue] = useState(0);

	const handleClick = (event) => {
		setCurrentValue(event.target.id);
		console.log(event.target.id);
	};

	return (
		<div className={Styles.Container}>
			<div className={Styles.NavBarContainer}>
				<div id="0" onClick={handleClick} className={Styles.Button}>
					Todas
				</div>
				<div id="1" onClick={handleClick} className={Styles.Button}>
					Tendencias
				</div>
				<div id="2" onClick={handleClick} className={Styles.Button}>
					Arte
				</div>
				<div id="3" onClick={handleClick} className={Styles.Button}>
					Comida
				</div>
				<div id="4" onClick={handleClick} className={Styles.Button}>
					Hogar
				</div>
				<div id="5" onClick={handleClick} className={Styles.Button}>
					Estilo
				</div>
				<div id="6" onClick={handleClick} className={Styles.Button}>
					Mas
				</div>
			</div>
			<div className={Styles.TabPanelContainer}>
				<TabPanel value={CurrentValue} index={"0"}>
					<div style={{ width: "100%" }}>
						<h1>TODAS</h1>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"1"}>
					<div style={{ width: "100%" }}>
						<h1>Tendencias</h1>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"2"}>
					<div style={{ width: "100%" }}>
						<h1>Arte</h1>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"3"}>
					<div style={{ width: "100%" }}>
						<h1>Comida</h1>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"4"}>
					<div style={{ width: "100%" }}>
						<h1>Hogar</h1>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"5"}>
					<div style={{ width: "100%" }}>
						<h1>Estilo</h1>
					</div>
				</TabPanel>
			</div>
		</div>
	);
}
