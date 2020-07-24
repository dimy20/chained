import React, { useState, useEffect } from "react";
import Styles from "./AnimatedQuote.module.css";
import Typical from "react-typical";
const makeArr1000s = (n) => {
	let arr = [];
	for (let i = 0; i < n; i++) {
		arr.push(200);
	}
	return arr;
};
//returns array with the reslult of the intersection of both arrays ["asd", 1000, "asdad", 1000, ...]
const insert1000s = (quote, arr1000s) => {
	let res = [];
	for (let i = 0; i <= quote.length - 1; i++) {
		res.push(quote[i]);
		res.push(arr1000s[i]);
	}
	return res;
};
//returns n words of given string, example => getWordsOf("I love you, not", 2) => returns : "I love"
//For some reason if n is equal to the exact number of words in the string, fails to return last word, FIX THIS
const getWordsOf = (string, n) => {
	let count = 0;
	let res = [];
	for (let i = 0; i < string.length - 1; i++) {
		if (string[i] === " ") {
			count++;
		}
		if (count === n) {
			res = string.slice(0, i);
			return res;
		}
	}
};
export default function AnimatedQuote(props) {
	const quoteText =
		"I love you, not only for what you are, but for what... what";
	const NumberOfWords = quoteText.split(" ").length;
	let steps = [];
	for (let i = 0; i <= NumberOfWords; i++) {
		steps.push(getWordsOf(quoteText, i));
	}
	let arr1 = makeArr1000s(steps.length - 1);
	let stepWithTime = insert1000s(steps, arr1);
	stepWithTime.pop();
	stepWithTime.pop();

	//console.log(makeSteps("Hola que tal como estas, ", 2));
	return (
		<div className={Styles.quote2}>
			<Typical steps={stepWithTime} loop={1} wrapper="p" />
		</div>
	);
}
