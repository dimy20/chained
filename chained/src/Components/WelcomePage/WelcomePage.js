import React from "react";
import WelcomeNavbar from "../WelcomeNavbar/WelcomeNavbar";
const SignupForm = (props) => {
	const { history } = props;
	return (
		<div style={{ width: "100%" }}>
			<WelcomeNavbar history={history}></WelcomeNavbar>
			<h1>Welcome page</h1>
		</div>
	);
};
export default SignupForm;
