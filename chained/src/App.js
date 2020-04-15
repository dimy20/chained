import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,BrowserRouter,Switch}  from 'react-router-dom';

import Styles from './App.module.css'
//Components
import Toolbar from './Components/Toolbar/Toolbar';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile'
const App = ()=>{
  const routes = {
    home : '/',
    profile : '/profile'
  }

  return (
    <div className= {Styles.container}>

    <Toolbar></Toolbar>
    <BrowserRouter>
      <Route  path ={routes.home} exact component = {Home}></Route>
      <Route  path ={routes.profile} exact component = {Profile}></Route>
    </BrowserRouter>
    </div>
    
  )
}

export default App;
