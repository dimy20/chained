import React, { useContext, useState, useEffect } from "react";
import ImagesContext from "../../ImagesContext";
import LoadingContext from "../../LoadingContext";
import axios from "axios";
export default function FetchImagesFromApi(props) {
	const { render, query, pageNumber } = props;
	const { Loading, setLoading } = useContext(LoadingContext);
	const [Err, setErr] = useState(false);
	const [ImgArr, setImgArr] = useState([]);
	const { ImgArrContext, setImgArrContext } = useContext(ImagesContext);
	useEffect(() => {
		setImgArrContext(ImgArr);
		console.log(ImgArrContext);
	}, [ImgArr]);
	useEffect(() => {
		setImgArr([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		let cancel;
		axios({
			method: "GET",
			url: `https://pixabay.com/api/?key=16381049-c197cfa5caeabac8c93d8da2c&q=${query}&image_type=photo&per_page=${28}&page=${pageNumber}`,
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((response) => {
				//FIX THIS REPETTITIOS
				console.log(response.data.hits[0]);
				setImgArr((prevImgs) => {
					return [...new Set([...prevImgs, ...response.data.hits])];
				});
				setLoading(false);
			})
			.catch((err) => {
				//ignore everytime we cancel the request
				if (axios.isCancel(err)) {
					return;
				}
				setErr(true);
			});
		return () => cancel();
	}, [query, pageNumber]);
	return <div>{render(Loading, ImgArr)}</div>;
}
