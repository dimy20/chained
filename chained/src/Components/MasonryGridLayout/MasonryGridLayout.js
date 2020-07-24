import React, { useState, useEffect, useRef } from "react";
import Styles from "./MasonryGridLayout.module.css";
import { Button, Form } from "react-bootstrap";
import AnimatedQuote from "../AnimatedQuote/AnimatedQuote";
import MyCard from "./myCard";
export default function MasonryGridLayout() {
	const [show, setShow] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, [4000]);
	});
	return (
		<div className={Styles.container}>
			<div className={Styles.Wrapper}>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>

				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>

				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>

				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>

				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>
				<MyCard
					username="Romina"
					quote="“I love you, not only for what you are, but for what I am when I am with you.”"
					tag="Love"
					quoteTittle="Love for all"
				></MyCard>

				{false && (
					<MyCard
						newquote={true}
						username="Romina"
						quote="“I love you, not only for what you are, but for what I am when I am with you.”"
						tag="Love"
						quoteTittle="Love for all"
					></MyCard>
				)}
			</div>
		</div>
	);
}
