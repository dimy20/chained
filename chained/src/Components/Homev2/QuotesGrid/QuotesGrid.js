import React from "react";
import Card from "../../Card/Card";
import Styles from "./QuotesGrid.module.css";
export default function QuotesColumns(props) {
	return (
		<div>
			{
				<div className={Styles.container}>
					<Card
						username="Romina"
						quote="“I love you, not only for what you are, but for what I am when I am with you.”"
						tag="Love"
						quoteTittle="Love for all"
					></Card>
				</div>
			}
		</div>
	);
}
