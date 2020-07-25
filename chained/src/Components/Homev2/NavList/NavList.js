import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "react-bootstrap";
import Styles from "./NavList.module.css";
import { Redirect } from "react-router-dom";
export default function NavList(props) {
	const [route, setRoute] = useState("/home"); // default route after log in
	return (
		<div className={Styles.container}>
			<List>
				<ListItem>
					<Button onClick={() => setRoute("/home")}>Home</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/profile")}>Profile</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/notifications")}>
						Notifications
					</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/messages")}>Messages</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/bookmarks")}>Bookmarks</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/settings")}>Settigs</Button>
				</ListItem>
				<ListItem>
					<Button onClick={() => setRoute("/profile")}>Quote</Button>
				</ListItem>
				<Redirect to={route}></Redirect>
			</List>
		</div>
	);
}
