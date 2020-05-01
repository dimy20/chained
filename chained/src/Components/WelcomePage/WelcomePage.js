import React from 'react';
import Styles from './WelcomePage.module.css';
import Logo from './Logo/Logo';
import Login from './Login/Login';
import Singup from './Signup/Singup'
const SignupForm = ()=>{
    return (
        <div className = {Styles.container}>
            <div className = {Styles.signAndLoginContainer}>
                <Login></Login>
                <Singup></Singup>
            </div>
            
        </div>
    )
};
export default SignupForm;