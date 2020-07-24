import React from "react";
import WelcomeNavbar from "../WelcomeNavbar/WelcomeNavbar";
import Styles from "./WelcomePage.module.css";
import MasonryGridLayout from "../MasonryGridLayout/MasonryGridLayout";
import { Button } from "react-bootstrap";

const SignupForm = (props) => {
	const { history } = props;
	return (
		<div className={Styles.Wrapper}>
			<WelcomeNavbar history={history}></WelcomeNavbar>
			<MasonryGridLayout></MasonryGridLayout>
		</div>
	);
};
export default SignupForm;
