import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Styles from "./AddQuote.module.css";
import joi from "joi";
export default function AddQuote(props) {
	const [show, setShow] = useState(false);
	const [newQuote, setNewQuote] = useState({
		tittle: "",
		author: "",
		quote: "",
	});
	const quoteSchema = joi.object({
		tittle: joi.string().max(20).min(1).required(),
		quote: joi.string().max(150).min(10).required(),
		author: joi.string().alphanum().max(20).min(1).required(),
	});

	//Bringin in the name for author value
	useEffect(() => {
		let unmounted = false;
		fetch("http://localhost:5000/user/profile", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				res.json().then((jsonData) => {
					const { username } = jsonData.data.user;
					if (!unmounted) {
						setNewQuote({
							...newQuote,
							author: username,
						});
					}
				});
			})
			.catch((err) => {
				console.log("ups :", err);
			});
	}, []);

	const handleClose = () => {
		setShow(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		//console.log(newQuote);
		const { error, value } = quoteSchema.validate(newQuote);
		if (!error) {
			console.log("Submitting!");
			fetch("http://localhost:5000/quote/createQuote", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.token}`,
				},
				body: JSON.stringify(newQuote),
			})
				.then((res) => {
					res.json().then((data) => {
						console.log(data.message);
						handleClose();
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log(error);
		}
	};

	return (
		<div>
			<Button onClick={() => setShow(true)}>Quote</Button>
			<Modal show={show} onHide={handleClose}>
				<div className={Styles.ModalBodyContainer}>
					<div className={Styles.wrapper}>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Control
									onChange={(e) => {
										setNewQuote({
											...newQuote,
											tittle: e.target.value,
										});
									}}
									className={Styles.tittle}
									type="text"
									placeholder="Tittle"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									onChange={(e) => {
										setNewQuote({
											...newQuote,
											quote: e.target.value,
										});
									}}
									className={Styles.textArea}
									as="textarea"
									rows="3"
								/>
							</Form.Group>
							<div className={Styles.ModalFooterContainer}>
								<div className={Styles.ModalWrapper}>
									<Button type="submit">Post</Button>
									<Button onClick={handleClose}>X</Button>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</Modal>
		</div>
	);
}
