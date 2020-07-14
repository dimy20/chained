import React, { useEffect } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { FormGroup } from "@material-ui/core";
import Styles from "./PasswordRecoveryModal.module.css";
export default function ForgotPasswordModal(props) {
	const { show, onHide, closeLoginModal, setIsLoginOpen } = props;
	//If show is true, close the login Modal
	useEffect(() => {
		if (show) {
			closeLoginModal();
		}
	}, [show]);
	//Closes Password Recovery Modal and sets isLoginOpen to true, so it opens again
	const handleGoBackButton = () => {
		onHide();
		setIsLoginOpen(true);
	};
	const handleSubmit = () => {};
	return (
		<div>
			<Modal show={show} onHide={onHide} centered>
				<Modal.Header>
					<Modal.Title>
						<h1 style={{ fontWeight: "bold" }}>Recover your account</h1>
					</Modal.Title>
				</Modal.Header>
				<div
					style={{
						width: "100%",
						padding: "10px",
						display: "grid",
					}}
				>
					<p
						style={{
							justifySelf: "center",
							fontWeight: "bold",
							fontSize: "15px",
						}}
					>
						Use your email or username to recover your password
					</p>
				</div>

				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<div className={Styles.FormInnerContainer}>
							<Form.Group style={{ width: "80%", justifySelf: "center" }}>
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
									}}
								>
									<Button onClick={handleGoBackButton}>Go back</Button>
									<Button onClick={onHide}>Close</Button>
								</div>
							</div>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
