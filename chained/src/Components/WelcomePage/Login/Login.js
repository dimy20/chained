import React from 'react';
import Styles from './Login.module.css';
import {Formik} from  'formik';

/* import axios from 'axios'; */
import {Form} from 'react-bootstrap'
import { StylesProvider } from '@material-ui/core';
const Login = ()=>{
    return (
        
            <Formik 
            initialValues ={{email : '', password : ''}}
            onSubmit = {(values,{setSubmitting,resetForm})=>{
                setSubmitting(true);
                setTimeout(()=>{
                    console.log('loading...');
                    
                },2000);
                console.log(`user ${values.email} has logged in`);
                setSubmitting(false);

            }}
            >
            {({values,handleBlur,handleChange,handleSubmit,handleReset,isSubmitting})=>{
               return (
                <Form className = {Styles.form} onSubmit = {handleSubmit}>
                <div className = {Styles.container}>
                        <div>
                            <div>
                           {/*  <label htmlFor = 'email'>Email</label> */}
                            </div>
                            
                                <input 
                                autoComplete = 'off'
                                className = {Styles.input}
                                name= 'email' 
                                id= 'email'
                                type = 'email'
                                placeholder = 'Email'
                                onChange = {handleChange} 
                                onBlur = {handleBlur} 
                                value ={values.email}
                                >
                                </input>  
                        </div>

                        <div>
                            <div>
                            {/* <label htmlFor = 'password'>password</label> */}
                            </div>
                            
                                <input 
                                autoComplete = 'off'
                                className = {Styles.input}
                                name= 'password' 
                                id= 'password'
                                type = 'text'
                                placeholder = 'Password'
                                onChange = {handleChange} 
                                onBlur = {handleBlur} 
                                value ={values.password}
                                >
                                    
                                </input>  
                        </div>

                    
                        
                        <button className = {Styles.btn} type = 'submit' disabled = {isSubmitting}>
                            Login
                        </button>
                    
                </div>
                </Form>
                
               )
              

            }}
            </Formik>
              
    
                
    )
}
export default Login;