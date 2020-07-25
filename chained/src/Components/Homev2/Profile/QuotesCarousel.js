import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
export default function QuotesCarousel() {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return <div></div>;
}
