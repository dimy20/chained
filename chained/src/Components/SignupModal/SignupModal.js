import React, { useState } from "react";
import {
	Modal,
	Button,
	Form,
	Container,
	Alert,
	Spinner,
} from "react-bootstrap";
import joi from "joi";
import SpinnerSvg from "../../Assests/spinner.svg";
import { TextareaAutosize } from "@material-ui/core";
export default function SignupModal(props) {
	const {
		isOpen,
		handleClose,
		history,
		setIsLoginOpen,
		setIsSignupOpen,
	} = props;
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		repeat_password: "",
	});
	const [ErrorAlert, setErrorAlert] = useState({
		message: "",
		showError: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const schema = joi.object({
		username: joi.string().alphanum().min(5).max(30).required(),
		email: joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		password: joi.string().min(8).required(),
		repeat_password: joi.ref("password"),
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const { error, value } = schema.validate({
			username: user.username,
			email: user.email,
			password: user.password,
			repeat_password: user.repeat_password,
		});
		if (!error) {
			setIsSubmitting(true);
			//Valid data from the form
			//Api call to auth/signup
			fetch("http://localhost:5000/auth/signup", {
				method: "POST",
				body: JSON.stringify(value),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					setTimeout(() => {
						setIsSubmitting(false);

						if (res.status !== 200) {
							res
								.json()
								.then((data) => {
									console.log();
									setErrorAlert({
										message: data.error.message,
										showError: true,
									});
								})
								.catch((err) => {
									console.log(err);
								});
						} else {
							//No error occured all
							// Ridirects user to login page!
							setIsLoginOpen(true);
							setIsSignupOpen(false);
							console.log("ALL GOOD");
						}
					}, 1000);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			//Removes double quotes
			const messageError = error.details[0].message.replace(/['"]+/g, "");
			setErrorAlert({
				message: messageError,
				showError: true,
			});
		}
	};
	return (
		<div>
			<Modal show={isOpen} onHide={handleClose} centered>
				<Modal.Header>
					<Modal.Title
						style={{
							fontWeight: "bold",
							fontSize: "30px",
							border: "2p solid red",
						}}
					>
						<Container>Sign up</Container>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: "60%" }}>
					<div style={{ height: "350px" }}>
						{!isSubmitting && (
							<Form onSubmit={handleSubmit}>
								<Form.Group>
									<Alert show={ErrorAlert.showError} variant="danger">
										<div
											style={{
												display: "grid",
												gridTemplateColumns: "80% 20%",
											}}
										>
											{ErrorAlert.message}
											<Button
												style={{
													width: "60%",
													padding: "2px",
													justifySelf: "end",
												}}
												onClick={() => {
													setErrorAlert({ ...ErrorAlert, showError: false });
												}}
											>
												Ok
											</Button>
										</div>
									</Alert>
									<Form.Text
										style={{
											fontWeight: "bold",
											fontSize: "17px",
											color: "black",
										}}
										className="text-muted"
									>
										Discover new ideas and have fun!
									</Form.Text>
								</Form.Group>
								<Form.Group
									onChange={(e) => {
										setUser({ ...user, username: e.target.value });
									}}
									controlId="formBasicUserName"
								>
									<Form.Control
										type="text"
										placeholder="Enter your userName"
									></Form.Control>
								</Form.Group>
								<Form.Group
									onChange={(e) => {
										setUser({ ...user, email: e.target.value });
									}}
									controlId="formBasicEmail"
								>
									<Form.Control
										type="email"
										placeholder="Enter your email"
									></Form.Control>
								</Form.Group>
								<Form.Group
									onChange={(e) => {
										setUser({ ...user, password: e.target.value });
									}}
									controlId="formBasicPassword"
								>
									<Form.Control
										type="password"
										placeholder="Enter your password"
									></Form.Control>
								</Form.Group>
								<Form.Group
									onChange={(e) => {
										setUser({ ...user, repeat_password: e.target.value });
									}}
									controlId="RepeatPassword"
								>
									<Form.Control
										type="password"
										placeholder="Repeat your password"
									></Form.Control>
								</Form.Group>
								<Button type="submit">Signup</Button>
							</Form>
						)}
						{isSubmitting && (
							<div
								style={{
									height: "300px",
									display: "grid",
								}}
							>
								<img
									style={{ justifySelf: "center", alignSelf: "center" }}
									src={SpinnerSvg}
								></img>
							</div>
						)}
					</div>
				</Modal.Body>

				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
}
