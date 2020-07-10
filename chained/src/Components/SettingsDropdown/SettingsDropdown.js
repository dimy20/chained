import react, { useState } from "react";
import { Modal } from "@material-ui/core";
import { Dropdown } from "react-bootstrap";
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
			<Modal
				open={isOpen}
				handleClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				disableAutoFocus={true}
			>
				<div
					style={{
						width: "22%",
						height: "70%",
						backgroundColor: "white",
						transform: "translate(50%, 20%)",
						display: "grid",
						gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
					}}
				>
					<Avatar style={{ justifySelf: "center", alignSelf: "center" }}>
						H
					</Avatar>
					<div style={{ display: "grid", gridTemplateRows: "40% 60%" }}>
						<h2
							style={{
								justifySelf: "center",
							}}
						>
							Add account
						</h2>
						<div
							style={{
								width: "40%",
								height: "90%",
								justifySelf: "center",
								alignSelf: "start",
								fontSize: "15px",
							}}
						></div>
						<div
							style={{
								display: "grid",
								gap: "5px",
								width: "100%",
								height: "100%",
								gridTemplateRows: "1fr 1fr",
							}}
						>
							<input
								placeholder="Email"
								style={{
									width: "60%",
									justifySelf: "center",
									padding: "10px",
									borderRadius: "10px",
								}}
							></input>
							<input
								placeholder="Password"
								style={{
									width: "60%",
									justifySelf: "center",
									padding: "10px",
									borderRadius: "10px",
								}}
							></input>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
