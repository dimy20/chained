import React from 'react';
import Styles from './Singup.module.css';
import {Formik} from 'formik';
import axios from 'axios';
import {Form} from 'react-bootstrap';
const Singup = ()=>{
    return(
            <Formik
                initialValues = {{name : '',
                                lastname : '',
                                email : '',
                                password : ''}}
                onSubmit = {(values,{setSubmitting,resetForm})=>{
                    setSubmitting(true);
                    axios.post('http://localhost:5000/user/signup',{
                        name : values.name,
                        lastname : values.lastname,
                        email : values.email,
                        password : values.password
                    })
                    .then(result=>{
                        console.log('user registered');
                        console.log(`${values.name} has registerd to db`);
                        setSubmitting(false);
                    })
                    .catch(err=>{
                        console.error(err);
                        
                    })

                    
                }}
            >
            {({values,handleBlur,handleChange,isSubmitting,handleSubmit,handleReset})=>{
                return (
                    <Form onSubmit = {handleSubmit}>
                    <div className = {Styles.container}>
                    <div>
                        <input
                            className = {Styles.input}
                            name = 'name'
                            id  = 'name'
                            type = 'text'
                            placeholder = 'Enter your name'
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            value = {values.name}
                        ></input>  
                    </div>
                    <div>
                        <input
                            className = {Styles.input}
                            name = 'lastname'
                            id  = 'lastname'
                            type = 'text'
                            placeholder = 'Enter your lastname'
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            value = {values.lastname}
                        ></input>  
                    </div>
                    <div>
                        <input
                            className = {Styles.input}
                            name = 'email'
                            id  = 'email'
                            type = 'email'
                            placeholder = 'Enter your email'
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            value = {values.email}
                        ></input>  
                    </div>
                    <div>
                        <input
                            className = {Styles.input}
                            name = 'password'
                            id  = 'password'
                            type = 'text'
                            placeholder = 'Enter your password'
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            value = {values.password}
                        ></input>  
                    </div>
                    <button className = {Styles.btn} type = 'submit' disabled = {isSubmitting}>
                        Sing in
                    </button>
                    </div>
                </Form>
            

                )
            }}
               
            </Formik>
    )
    
}
export default Singup;