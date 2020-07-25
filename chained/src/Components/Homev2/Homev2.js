import React, { useState } from "react";
import Styles from "./Homev2.module.css";
import QuotesGrid from "./QuotesGrid/QuotesGrid";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import NavList from "./NavList/NavList";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";
import Bookmarks from "./Bookmarks/Bookmarks";
import Settings from "./Settings/Settings";
export default function Homev2() {
	return (
		<div className={Styles.Container}>
			<BrowserRouter>
				{/*The navbar renders for every route!*/}
				<div className={Styles.Items}>
					<Route
						path="/"
						component={() => {
							return <NavList></NavList>;
						}}
					></Route>
				</div>
				<div className={Styles.CenterColumn}>
					<Route
						path="/profile"
						exact
						component={() => {
							return <Profile></Profile>;
						}}
					></Route>

					<Route
						path="/home"
						exact
						component={() => {
							return <QuotesGrid></QuotesGrid>;
						}}
					></Route>
					<Route
						path="/notifications"
						exact
						component={() => {
							return <Notifications></Notifications>;
						}}
					></Route>
					<Route
						path="/messages"
						exact
						component={() => {
							return <Messages></Messages>;
						}}
					></Route>
					<Route
						path="/bookmarks"
						exact
						component={() => {
							return <Bookmarks></Bookmarks>;
						}}
					></Route>
					<Route
						path="/settings"
						exact
						component={() => {
							return <Settings></Settings>;
						}}
					></Route>
				</div>
				<div className={Styles.Items}></div>
			</BrowserRouter>
		</div>
	);
}
