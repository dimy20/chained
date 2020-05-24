import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from "react";
import Styles from "./Home.module.css";
import { CircularProgress } from "@material-ui/core";

//components
import Card from "./Card/Card";
import CardCollection from "../CardCollection/CardCollection";
import FetchImagesFromApi from "../FetchImagesFromApi/FetchImagesFromApi";
//hooks
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";
//context
import SearchContext from "../../SearchContext";
import ImagesContext from "../../ImagesContext";
import LoadingContext from "../../LoadingContext";
const Home = ({ history }) => {
	const { SearchString, setSearchString } = useContext(SearchContext);
	const [imgNumber, setimgNumber] = useState(1);
	const [Loading, setLoading] = useState(true);
	/* const [lastImgElement] = useInfiniteScroll(Loading); */

	const observer = useRef();
	const lastImgElement = useCallback(
		(node) => {
			if (Loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				console.log(entries);
				if (entries[0].isIntersecting) {
					console.log("visible");
					setimgNumber((previmgNumber) => previmgNumber + 1);
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
		<div className={Styles.container}>
			<LoadingContext.Provider value={{ Loading, setLoading }}>
				<FetchImagesFromApi
					query={SearchString}
					pageNumber={imgNumber}
					render={(Loading, ImgArr) => {
						console.log("heloooo", ImgArr);
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
};
export default Home;
