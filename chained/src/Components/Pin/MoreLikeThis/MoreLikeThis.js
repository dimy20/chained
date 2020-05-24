import React, { useContext, useState, useRef, useCallback } from "react";
import Styles from "./MoreLikeThis.module.css";
/* import PinsDisplaySection from "./PinsDisplaySection/PinsDisplaySection"; */
import CardCollection from "../../CardCollection/CardCollection";
import FetchImagesFromApi from "../../FetchImagesFromApi/FetchImagesFromApi";

import LoadingContext from "../../../LoadingContext";
export default function MoreLikeThis(props) {
	/* const { lastImgElement } = useInfiniteScroll(); */
	const { history } = props;
	const [Loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const observer = useRef();
	const lastImgElement = useCallback(
		(node) => {
			if (Loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				console.log(entries);
				if (entries[0].isIntersecting) {
					console.log("visible");
					setPageNumber((previmgNumber) => previmgNumber + 1);
				}
			});
			if (node) {
				observer.current.observe(node);
			}
			console.log(node);
		},
		[Loading]
	);
	return (
		<div className={Styles.wrapper}>
			<h3 className={Styles.heading}>Mas como esto</h3>
			<LoadingContext.Provider value={{ Loading, setLoading }}>
				<FetchImagesFromApi
					query={"cars"}
					pageNumber={pageNumber}
					render={(Loading, ImgArr) => {
						return (
							<CardCollection
								history={history}
								lastImgElement={lastImgElement}
								Loading={Loading}
								ImgArr={ImgArr}
							></CardCollection>
						);
					}}
				></FetchImagesFromApi>
			</LoadingContext.Provider>
		</div>
	);
}
