import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Styles from "./NavBar.module.css";
import FetchImagesFromApi from "../FetchImagesFromApi/FetchImagesFromApi";
import LoadingContext from "../../LoadingContext";
import OptimizedFetchComponentTest from "../OptimizedFetchComponentTest/OptimizedFetchComponentTest";
import Card from "../Home/Card/Card";
function TabPanel(props) {
	const { children, value, index, ...other } = props;
	const element = <div>{children}</div>;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && element}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

export default function SimpleTabs(props) {
	const { history } = props;
	const [CurrentValue, setCurrentValue] = useState(0);
	const [Loading, setLoading] = useState(false);
	const [PageNumber, setPageNumber] = useState(1);
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const ref4 = useRef();
	const ref5 = useRef();
	const ref6 = useRef();
	const ref7 = useRef();
	const refArr = [ref1, ref2, ref3, ref4, ref5, ref6, ref7];
	const handleClick = (event) => {
		setCurrentValue(event.target.id);
	};
	useEffect(() => {
		for (let i = 0; i <= 6; i++) {
			if (refArr[i].current.id === CurrentValue) {
				refArr[i].current.className = Styles.ButtonActive;
				for (let i = 0; i <= 6; i++) {
					if (refArr[i].current.id != CurrentValue) {
						refArr[i].current.className = Styles.Button;
					}
				}
				break;
			}
		}
	}, [CurrentValue]);

	return (
		<div className={Styles.Container}>
			<div className={Styles.NavBarContainer}>
				<div
					ref={refArr[0]}
					id="0"
					onClick={handleClick}
					className={Styles.Button}
				>
					Todos
				</div>
				<div
					ref={refArr[1]}
					id="1"
					onClick={handleClick}
					className={Styles.Button}
				>
					Tendencias
				</div>
				<div
					ref={refArr[2]}
					id="2"
					onClick={handleClick}
					className={Styles.Button}
				>
					Arte
				</div>
				<div
					id="3"
					ref={refArr[3]}
					onClick={handleClick}
					className={Styles.Button}
				>
					Comida
				</div>
				<div
					id="4"
					ref={refArr[4]}
					onClick={handleClick}
					className={Styles.Button}
				>
					Hogar
				</div>
				<div
					id="5"
					ref={refArr[5]}
					onClick={handleClick}
					className={Styles.Button}
				>
					Estilo
				</div>
				<div
					id="6"
					ref={refArr[6]}
					onClick={handleClick}
					className={Styles.Button}
				>
					Mas
				</div>
			</div>
			<div className={Styles.TabPanelContainer}>
				<TabPanel value={CurrentValue} index={"0"}>
					<div className={Styles.test}>
						<OptimizedFetchComponentTest
							PageNumber={PageNumber}
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{!Loading &&
											imgArr.map((img) => {
												return (
													<div key={img.id}>
														<img
															style={{
																width: "100%",
																height: "100%",
																justifySelf: "center",
																borderRadius: "10px",
															}}
															src={img.largeImageURL}
														></img>
													</div>
												);
											})}
									</div>
								);
							}}
							query="cars"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"1"}>
					<div style={{ width: "100%" }}>
						<OptimizedFetchComponentTest
							pageNumber={PageNumber}
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{imgArr.map((img, index) => {
											return (
												<div key={img.id}>
													<img
														style={{
															width: "100%",
															height: "100%",
															justifySelf: "center",
															borderRadius: "10px",
														}}
														src={img.largeImageURL}
													></img>
												</div>
											);
										})}
									</div>
								);
							}}
							query="Electronics"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"2"}>
					<div style={{ width: "100%" }}>
						<OptimizedFetchComponentTest
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{imgArr.map((img) => {
											return (
												<div key={img.id}>
													<img
														style={{
															width: "100%",
															height: "100%",
															justifySelf: "center",
															borderRadius: "10px",
														}}
														src={img.largeImageURL}
													></img>
												</div>
											);
										})}
									</div>
								);
							}}
							query="Art"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"3"}>
					<div style={{ width: "100%" }}>
						<OptimizedFetchComponentTest
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{imgArr.map((img) => {
											return (
												<div key={img.id}>
													<img
														style={{
															width: "100%",
															height: "100%",
															justifySelf: "center",
															borderRadius: "10px",
														}}
														src={img.largeImageURL}
													></img>
												</div>
											);
										})}
									</div>
								);
							}}
							query="Food"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"4"}>
					<div style={{ width: "100%" }}>
						<OptimizedFetchComponentTest
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{imgArr.map((img) => {
											return (
												<div key={img.id}>
													<img
														style={{
															width: "100%",
															height: "100%",
															justifySelf: "center",
															borderRadius: "10px",
														}}
														src={img.largeImageURL}
													></img>
												</div>
											);
										})}
									</div>
								);
							}}
							query="Home"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
				<TabPanel value={CurrentValue} index={"5"}>
					<div style={{ width: "100%" }}>
						<OptimizedFetchComponentTest
							render={(Loading, imgArr) => {
								console.log("This is a test : ", imgArr);
								return (
									<div className={Styles.TabPanelItemsConainer}>
										{imgArr.map((img) => {
											return (
												<div key={img.id}>
													<img
														style={{
															width: "100%",
															height: "100%",
															justifySelf: "center",
															borderRadius: "10px",
														}}
														src={img.largeImageURL}
													></img>
												</div>
											);
										})}
									</div>
								);
							}}
							query="Style"
							pageNumber={1}
						></OptimizedFetchComponentTest>
					</div>
				</TabPanel>
			</div>
		</div>
	);
}
