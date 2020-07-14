import React, { useState } from "react";
import { Modal, Button, Form, Container, Alert } from "react-bootstrap";
import joi from "joi";
import { Redirect } from "react-router-dom";
import PasswordRecoveryModal from "../PasswordRecoveryModal/PasswordRecoveryModal";
export default function LoginModal(props) {
	const { isOpen, handleClose, setIsLoginOpen } = props;
	const [ShowPasswordRecoveryModal, setShowPasswordRecoveryModal] = useState(
		false
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [RedirectToHome, setRedirectToHome] = useState(false);
	const [ErrorAlert, setErrorAlert] = useState({
		message: "",
		showError: false,
	});
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const LoginSchema = joi.object({
		username: joi.string().alphanum().min(5).max(30).required(),
		password: joi.string().min(8).required(), // MAKE THIS STRONGER LATER
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const { error, value } = LoginSchema.validate({
			username: user.username,
			password: user.password,
		});
		if (error === null) {
			setIsSubmitting(true);
			console.log("All is good");
			fetch("http://localhost:5000/auth/login", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					setIsSubmitting(false);
					setTimeout(() => {
						if (res.status !== 200) {
							//Some Error
							res.json().then((data) => {
								setErrorAlert({
									showError: true,
									message: data.error.message,
								});
							});
						} else {
							//All Good Should get a token back
							res.json().then((data) => {
								localStorage.token = data.token;
								if (localStorage.token) {
									setRedirectToHome(true);
								}
							});
						}
					}, 1000);
				})
				.catch((err) => {
					//Fetch Error
					console.log(err);
				});
		} else {
			//VALIDATION ERROR!
			console.log(error);
		}
	};

	return (
		<div>
			<Modal show={isOpen} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title style={{ fontWeight: "bold", fontSize: "25px" }}>
						Log in
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
					<Container>
						<Form onSubmit={handleSubmit}>
							<Form.Group
								onChange={(e) => {
									setUser({
										...user,
										username: e.target.value,
									});
								}}
								controlId="formBasicEmail"
							>
								<Form.Control type="text" placeholder="Enter your username" />
							</Form.Group>

							<Form.Group
								onChange={(e) => {
									setUser({
										...user,
										password: e.target.value,
									});
								}}
								controlId="formBasicPassword"
							>
								<Form.Control type="password" placeholder="Password" />
								<Form.Text
									style={{ fontWeight: "bold", fontSize: "15px" }}
									className="text-muted"
								>
									<a
										onClick={() => {
											setShowPasswordRecoveryModal(true);
										}}
										href="#"
										style={{
											color: "black",
											fontWeight: "bold",
										}}
									>
										Forgot your password?
									</a>
								</Form.Text>
							</Form.Group>

							<Button variant="primary" type="submit">
								Login
							</Button>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
			{RedirectToHome && <Redirect to="/home"></Redirect>}
			<PasswordRecoveryModal
				show={ShowPasswordRecoveryModal}
				onHide={() => {
					setShowPasswordRecoveryModal(false);
				}}
				setIsLoginOpen={setIsLoginOpen}
				closeLoginModal={handleClose}
			></PasswordRecoveryModal>
		</div>
	);
}
