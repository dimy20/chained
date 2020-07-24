import React, {
	useEffect,
	useRef,
	useState,
	useContext,
	ReactDOM,
} from "react";
import Styles from "./Card.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";

export default function MyCard(props) {
	const { test, newquote, username, quoteTittle, quote, tag } = props;

	const [testStyle, setTestStyle] = useState({
		transform: ``,
		opacity: "",
	});

	//console.log(TimeToHide);
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (newquote) {
			setTestStyle({
				transform: `translate(430%,-200%)`,
				opacity: "0",
			});
		}
	});

	useEffect(() => {
		if (test) {
			//Time the card is going to live
			const TimeToHide = Math.floor(Math.random() * 20 * 1000);
			console.log(TimeToHide);
			setTimeout(() => {
				setShow(true);
			}, TimeToHide);
		}
	});

	return (
		<div
			style={newquote ? testStyle : null}
			className={newquote ? Styles.newQuote : Styles.wrapper}
		>
			<div className={Styles.section1}>
				<p className={Styles.header}>{tag}</p>
				<h2 className={Styles.h2}>{quoteTittle}</h2>
				<p className={Styles.adjective}>{username}</p>
				<p className={Styles.quote}>{quote}</p>
			</div>

			<div className={Styles.section2}>
				<div className={Styles.bar}>
					<BookmarkIcon style={{ color: "#127ba3" }}></BookmarkIcon>
					<FavoriteIcon style={{ color: "#127ba3" }}></FavoriteIcon>
					<VisibilityIcon style={{ color: "#127ba3" }}></VisibilityIcon>
				</div>
			</div>
		</div>
	);
}
