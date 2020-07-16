import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from "react";
import Styles from "./Home.module.css";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
//components
import Card from "./Card/Card";
import CardCollection from "../CardCollection/CardCollection";
import FetchImagesFromApi from "../FetchImagesFromApi/FetchImagesFromApi";
//hooks

//context
import SearchContext from "../../SearchContext";
import ImagesContext from "../../ImagesContext";
import LoadingContext from "../../LoadingContext";
const Home = ({ history }) => {
	const [user, setUSer] = useState({});
	const [redirect, setRidirect] = useState(false);
	const { SearchString, setSearchString } = useContext(SearchContext);
	console.log(SearchString);
	const [imgNumber, setimgNumber] = useState(1);
	const [Loading, setLoading] = useState(true);
	/* const [lastImgElement] = useInfiniteScroll(Loading); */
	console.log("History :::", history);
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
	useEffect(() => {
		axios({
			method: "POST",
			url:
				"https://api.imgur.com/oauth2/authorize?client_id=5dfc22e72ea94c0&response_type=token",
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		fetch("http://localhost:5000/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
			},
		})
			.then((res) => {
				res.json().then((data) => {
					if (data) {
						setUSer(data);
					} else {
						localStorage.removeItem("token");
						setRidirect(true);
					}

					console.log(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
			{redirect && <Redirect to="/"></Redirect>}
		</div>
	);
};
export default Home;
