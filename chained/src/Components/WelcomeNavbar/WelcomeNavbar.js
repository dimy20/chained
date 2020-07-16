import React, { useState, useContext } from "react";
import MyModal from "../MyModal/MyModal";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import {
	Navbar,
	NavDropdown,
	FormControl,
	Button,
	Nav,
	Form,
} from "react-bootstrap";
export default function WelcomeNavbar(props) {
	const { history } = props;
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);

	const handleIsUserLoggedIn = () => {};
	const handleSignupClose = () => {
		setIsSignupOpen(false);
	};

	const handleSignupClick = () => {
		setIsSignupOpen(true);
	};
	const handleLoginClose = () => {
		setIsLoginOpen(false);
	};
	const handleLoginClick = () => {
		setIsLoginOpen(true);
	};
	return (
		<div style={{ width: "100%", marginTop: "1vh" }}>
			{/* Navbar */}
			<Navbar bg="dark" variant="light" expand="lg">
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Form inline>
						<Button style={{ margin: "5px" }}>About</Button>
						<Button onClick={handleLoginClick} style={{ margin: "5px" }}>
							Log in
						</Button>
						<Button onClick={handleSignupClick} style={{ margin: "5px" }}>
							Sign up
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
			{/* Login modal Form */}
			<LoginModal
				isOpen={isLoginOpen}
				handleClose={handleLoginClose}
				setIsLoginOpen={setIsLoginOpen}
			></LoginModal>
			{/* Sign up modal Form */}
			<SignupModal
				setIsSignupOpen={setIsSignupOpen}
				setIsLoginOpen={setIsLoginOpen}
				history={history}
				isOpen={isSignupOpen}
				handleClose={handleSignupClose}
			></SignupModal>
		</div>
	);
}
