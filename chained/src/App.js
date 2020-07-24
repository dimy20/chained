import React, { useState } from "react";

/* import "bootstrap/dist/css/bootstrap.min.css"; */
import "bootswatch/dist/lumen/bootstrap.min.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Styles from "./App.module.css";
//Components
//import Toolbar from "./Components/Toolbar/Toolbar";
//import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Pin from "./Components/Pin/Pin";
import Following from "./Components/Following/Following";
import Homev2 from "./Components/Homev2/Homev2";

//context
import SearchContext from "./SearchContext";
import ImagesContext from "./ImagesContext";
import PeopleYouFollowContext from "./Contexts/PeopleYouFollowContext";
import FindPeopleContext from "./Contexts/FindPeopleContext";
const App = () => {
	const [SearchString, setSearchString] = useState("");
	const [ImgArrContext, setImgArrContext] = useState([]);
	const [IsPeopleYouFollowOpen, setIsPeopleYouFollowOpen] = useState(false);
	const [IsFindPeopleOpen, setIsFindPeopleOpen] = useState(false);

	const routes = {
		welcomePage: "/welcome",
		home: "/",
	};

	return (
		<div className={Styles.container}>
			<BrowserRouter>
				<Route
					path={routes.home}
					render={() => {
						{
							/* IF user is not logged in, redirects to welcome page else renders home page */
						}
						return !localStorage.token ? (
							<Redirect to="/welcome"></Redirect>
						) : (
							<Homev2></Homev2>
						);
					}}
				></Route>
				<Route
					path={routes.welcomePage}
					exact
					render={() => {
						{
							{
								/*Is user logged in ? */
							}
							return localStorage.token ? (
								<Redirect to="/"></Redirect>
							) : (
								<WelcomePage></WelcomePage>
							);
						}
					}}
				></Route>
			</BrowserRouter>
		</div>
	);
};

export default App;
