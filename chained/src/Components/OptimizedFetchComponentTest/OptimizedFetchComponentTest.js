import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
export default function OptimizedFetchComponentTest(props) {
	const [Loading, setLoading] = useState(false);
	const { render, query, PageNumber } = props;
	const [imgArr, setImgArr] = useState([]);
	//WHEN QUERY CHANGES SETS imgArr TO EMPTY ARR SO PREVIUOS IMGS AND FOLLOWING IMGS DONT GET STACKED
	useEffect(() => {
		setImgArr([]);
	}, [query]);
	useEffect(() => {
		setLoading(true);
		let cancel;
		axios({
			method: "GET",
			url: `https://pixabay.com/api/?key=16381049-c197cfa5caeabac8c93d8da2c&q=${query}&image_type=photo&per_page=${100}&page=${PageNumber}`,
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
			});
		return () => cancel();
	}, [query, PageNumber]);

	return <div>{render(Loading, imgArr)}</div>;
}
