import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Container, Alert } from "react-bootstrap";
import { FormGroup } from "@material-ui/core";
import Styles from "./PasswordRecoveryModal.module.css";
import joi from "joi";
import axios from "axios";
export default function ForgotPasswordModal(props) {
	const { show, onHide, closeLoginModal, setIsLoginOpen } = props;
	const [ShowSendEmailButton, setShowSendEmailButton] = useState(false);
	const requestUrl = "http://localhost:5000/password/reset";
	const [ErrorAlert, setErrorAlert] = useState({
		message: "",
		showError: false,
	});
	const [user, setUser] = useState({
		email: "",
	});
	const schema = joi.object({
		email: joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "org"] },
		}),
	});
	//Closes Password Recovery Modal and sets isLoginOpen to true, so it opens again
	const handleGoBackButton = () => {
		onHide();
		setIsLoginOpen(true);
	};
	//As it validates
	const handleChange = (e) => {
		setUser({
			email: e.target.value,
		});
	};
	const handleSubmit = () => {
		console.log("Data sent to server : ", user);
		axios({
			method: "POST",
			url: requestUrl,
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				email: user.email,
			},
		})
			.then((res) => {
				//fetched data
				console.log(res.data.message);
			})
			.catch((err) => {
				//Error from server
				console.log(err.response.data.error.message);
			});
	};

	//If show is true, close the login Modal
	useEffect(() => {
		if (show) {
			closeLoginModal();
			setErrorAlert({
				...ErrorAlert,
				showError: false,
			});
		}
	}, [show]);

	useEffect(() => {
		const { error, value } = schema.validate({
			email: user.email,
		});
		if (error === null) {
			setShowSendEmailButton(true);
		} else {
			setShowSendEmailButton(false);
		}
	}, [user.email]);

	return (
		<div>
			<Modal show={show} onHide={onHide} centered>
				<Modal.Header>
					<Modal.Title>
						<h1 style={{ fontWeight: "bold" }}>Recover your account</h1>
					</Modal.Title>
				</Modal.Header>
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
				<div
					style={{
						width: "80%",
						padding: "10px",
						display: "grid",
						justifySelf: "center",
						height: "70px",
					}}
				>
					<p
						style={{
							fontWeight: "bold",
							fontSize: "16px",
							color: "grey",
							marginLeft: "7%",
						}}
					>
						You can use your email or username to recover your password
					</p>
				</div>

				<Modal.Body>
					<Form>
						<div className={Styles.FormInnerContainer}>
							<Form.Group
								onChange={handleChange}
								style={{ width: "90%", justifySelf: "center" }}
							>
								<Form.Control
									type="Email"
									placeholder="Enter your email"
									size="lg"
								></Form.Control>
							</Form.Group>
							<div
								style={{
									width: "90%",
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										width: "35%",
										padding: "2px",
									}}
								>
									<Button onClick={handleGoBackButton}>Go back</Button>
									<Button onClick={onHide}>Close</Button>
								</div>
							</div>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{ShowSendEmailButton && (
						<Button className={Styles.SendEmailButton} onClick={handleSubmit}>
							Send email
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}
