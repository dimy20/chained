import { useRef, useCallback, useState } from "react";
const useIfiniteScroll = (Loading) => {
	const [PageNumber, setPageNumber] = useState(1);
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
	return [lastImgElement];
};
export default useIfiniteScroll;
