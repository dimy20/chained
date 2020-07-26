import React from "react";
import Styles from "./User.module.css";
import Profile from "../Profile/Profile";
export default function User(props) {
	return <Profile isUser userId={props.location.state.user}></Profile>;
}
