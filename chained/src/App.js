import React, { useState } from "react";

/* import "bootstrap/dist/css/bootstrap.min.css"; */
import "bootswatch/dist/lumen/bootstrap.min.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Styles from "./App.module.css";
//Components
import Toolbar from "./Components/Toolbar/Toolbar";
import Home from "./Components/Home/Home";
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
		welcomePage: "/",
		home: "/home",
		profile: "/profile",
		signup: "/signup",
		pin: "/pin",
		following: "/following",
		test: "/main",
	};

	return (
		<div className={Styles.container}>
			<BrowserRouter>
				<SearchContext.Provider value={{ SearchString, setSearchString }}>
					<Route path={routes.test} exact component={Toolbar}></Route>
				</SearchContext.Provider>

				<ImagesContext.Provider value={{ ImgArrContext, setImgArrContext }}>
					<SearchContext.Provider value={{ SearchString, setSearchString }}>
						<Route
							path={routes.home}
							exact
							render={() => {
								{
									/* IF user is not logged in, redirects to welcome page
								       Else : is logged in 
									*/
								}
								return !localStorage.token ? (
									<Redirect to="/"></Redirect>
								) : (
									<Homev2></Homev2>
								);
							}}
						></Route>
					</SearchContext.Provider>
				</ImagesContext.Provider>

				<div className={Styles.displayContainer}>
					<Route
						path={routes.welcomePage}
						exact
						render={() => {
							{
								{
									/*Is user logged in ? */
								}
								return localStorage.token ? (
									<Redirect to="/home"></Redirect>
								) : (
									<WelcomePage></WelcomePage>
								);
							}
						}}
					></Route>

					<Route path={routes.profile} exact component={Profile}></Route>
					<ImagesContext.Provider value={{ ImgArrContext, setImgArrContext }}>
						<Route path={routes.pin} exact component={Pin}></Route>
					</ImagesContext.Provider>
					<FindPeopleContext.Provider
						value={{ IsFindPeopleOpen, setIsFindPeopleOpen }}
					>
						<PeopleYouFollowContext.Provider
							value={{ IsPeopleYouFollowOpen, setIsPeopleYouFollowOpen }}
						>
							<Route
								path={routes.following}
								exact
								component={Following}
							></Route>
						</PeopleYouFollowContext.Provider>
					</FindPeopleContext.Provider>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
