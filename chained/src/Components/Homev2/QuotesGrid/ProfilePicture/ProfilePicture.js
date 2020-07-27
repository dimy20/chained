import React, { useEffect, useState } from "react";
import Styles from "./ProfilePicture.module.css";
import { Redirect } from "react-router-dom";
export default function ProfilePicture(props) {
	const { user } = props;
	const [shouldRedirect, setShouldRedirect] = useState(false);
	return (
		<div>
			<img
				onClick={() => setShouldRedirect(true)}
				className={Styles.ProfilePicture}
				src={
					"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				}
			></img>
			{shouldRedirect && (
				<Redirect
					to={{
						pathname: "/user",
						state: {
							user: user,
						},
					}}
				></Redirect>
			)}
		</div>
	);
}
