import react, { useState } from "react";
import { Dropdown, Modal, Button, Form, Container } from "react-bootstrap";
import React from "react";
import { Avatar } from "@material-ui/core";

export default function SettingsDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		setIsOpen(false);
	};
	const handleClick = () => {
		setIsOpen(true);
	};
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle variant="secondary"></Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Header>Accounts</Dropdown.Header>
					<Dropdown.Divider />
					<Dropdown.Item onClick={handleClick}>
						<p style={{ color: "black", fontWeight: "bold" }}>
							Add Another account
						</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-2">
						<p style={{ color: "black", fontWeight: "bold" }}>
							Add a free account for your company
						</p>
					</Dropdown.Item>
					<Dropdown.Header>More options</Dropdown.Header>
					<Dropdown.Divider />
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>Settings</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>
							Make your feed better
						</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>
							Download desktop app
						</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>Get help</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>
							Privacy and term conditions
						</p>
					</Dropdown.Item>
					<Dropdown.Item href="#/action-3">
						<p style={{ color: "black", fontWeight: "bold" }}>Log out</p>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Modal show={isOpen} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title style={{ fontWeight: "bold", fontSize: "25px" }}>
						Add account
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form>
							<Form.Group controlId="formBasicEmail">
								<Form.Control type="email" placeholder="Enter email" />
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Control type="password" placeholder="Password" />
								<Form.Text
									style={{ fontWeight: "bold", fontSize: "15px" }}
									className="text-muted"
								>
									Forgot your password?
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
		</div>
	);
}
