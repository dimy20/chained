import { useState, useEffect } from "react";
import axios from "axios";
const useAsyncData = (initialData, initialUrl) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`,
					},
				});

				setData(result.data);
			} catch (error) {
				setIsError(true);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	return [{ data, isLoading, isError }, setUrl];
};
export default useAsyncData;
