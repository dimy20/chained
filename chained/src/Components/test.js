import React, { useEffect } from "react";
import axios from "axios";
export default function Test() {
	useEffect(() => {
		axios
			.get(`https://pixabay.com/users/josch13-48777/`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return <div></div>;
}
