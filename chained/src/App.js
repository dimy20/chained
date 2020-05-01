import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,BrowserRouter}  from 'react-router-dom';

import Styles from './App.module.css'
//Components
import Toolbar from './Components/Toolbar/Toolbar';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile'
import WelcomePage from './Components/WelcomePage/WelcomePage';
const App = ()=>{
  const routes = {
    home : '/',
    profile : '/profile',
    signup : '/signup',
  }

  return (
    <div className= {Styles.container}>        
          <BrowserRouter>
            <Route path = {routes.signup} exact component = {WelcomePage}></Route>
            <Route  path ={routes.home} exact component = {Home}></Route>
            <div className = {Styles.displayContainer}>
                <Route  path ={routes.profile} exact component = {Profile}></Route>
            </div>
          </BrowserRouter>
        
      
    </div>
    
  )
}

export default App;
