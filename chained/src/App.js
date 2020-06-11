import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter } from "react-router-dom";

import Styles from "./App.module.css";
//Components
import Toolbar from "./Components/Toolbar/Toolbar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Pin from "./Components/Pin/Pin";
import Following from "./Components/Following/Following";

//context
import SearchContext from "./SearchContext";
import ImagesContext from "./ImagesContext";
<<<<<<< HEAD
import PeopleYouFollowContext from "./Contexts/PeopleYouFollowContext";
import FindPeopleContext from "./Contexts/FindPeopleContext";
=======
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473

const App = () => {
	const [SearchString, setSearchString] = useState("");
	const [ImgArrContext, setImgArrContext] = useState([]);
<<<<<<< HEAD
	const [IsPeopleYouFollowOpen, setIsPeopleYouFollowOpen] = useState(false);
	const [IsFindPeopleOpen, setIsFindPeopleOpen] = useState(false);
=======
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473
	const routes = {
		home: "/",
		profile: "/profile",
		signup: "/signup",
		pin: "/pin",
		following: "/following",
	};

	return (
		<div className={Styles.container}>
			<BrowserRouter>
				<Route path={routes.signup} exact component={WelcomePage}></Route>
				<SearchContext.Provider value={{ SearchString, setSearchString }}>
					<Route path={routes.home} component={Toolbar}></Route>
				</SearchContext.Provider>

				<ImagesContext.Provider value={{ ImgArrContext, setImgArrContext }}>
					<SearchContext.Provider value={{ SearchString, setSearchString }}>
						<Route path={routes.home} exact component={Home}></Route>
					</SearchContext.Provider>
				</ImagesContext.Provider>

				<div className={Styles.displayContainer}>
					<Route path={routes.profile} exact component={Profile}></Route>
					<ImagesContext.Provider value={{ ImgArrContext, setImgArrContext }}>
						<Route path={routes.pin} exact component={Pin}></Route>
					</ImagesContext.Provider>
<<<<<<< HEAD
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
=======
					<Route path={routes.following} exact component={Following}></Route>
>>>>>>> 0dbb31ef5d9890a795c21e9c0ed54f7274af4473
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
