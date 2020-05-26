import React, { useState, useEffect, useRef } from "react";

import MoreLikeThis from "./MoreLikeThis/MoreLikeThis";

import PinCard from "./PinCard/PinCard";
const Pin = (props) => {
	const { history } = props;
	console.log(history.location.state.tags);
	return (
		<div>
			<PinCard history={history}></PinCard>
			<MoreLikeThis history={history}></MoreLikeThis>
		</div>
	);
};
export default Pin;
