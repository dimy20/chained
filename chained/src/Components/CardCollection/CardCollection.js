import React from "react";
import Styles from "./CardCollection.module.css";
import Card from "../Home/Card/Card";
export default function CardCollection(props) {
	const { Loading, ImgArr, history, lastImgElement } = props;
	return (
		<div className={Styles.container}>
			{Loading && (
				<div className={Styles.loadingContainer}>
					<h1 className={Styles.Loading}>Loading...</h1>
				</div>
			)}
			<div className={Styles.CardContainer}>
				{ImgArr.map((img, index) => {
					{
						if (ImgArr.length === index + 1) {
							return (
								<div key={img.id} ref={lastImgElement}>
									<Card src={img.largeImageURL}></Card>
								</div>
							);
						}
						return (
							<Card
								tags={img.tags}
								history={history}
								key={img.id}
								src={img.largeImageURL}
							></Card>
						);
					}
				})}
			</div>
		</div>
	);
}
