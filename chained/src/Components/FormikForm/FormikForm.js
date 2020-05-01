import React from 'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
/* import ErrorForm from './Error/ErrorForm';
import axios from 'axios';
 */
const validationSchema = Yup.object().shape({
    name : Yup.string()
    .min(1,'must have at leat one character')
    .max(255,'no more than 255 characters are allowed')
    .required('must enter name'),
    description : Yup.string()
    .min(15,'must be at least 15 characters long')
    .max(255,'description should not be longer than 255 characters')
    .required('must enter a description')
});
const FormikForm = ()=>{
    return (
        
            <Formik 
            initialValues ={{name : '', description : ''}}
            onSubmit = {(values,{setSubmitting,resetForm})=>{
                setSubmitting(true);
                axios.post('http://localhost:5000/descriptions',{
                    name : values.name,
                    description : values.description
                                   })
                .then(result =>{
                    console.log('Description added to database');
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err=>{
                    console.error(err);
                })

            }}
            >
            {({values,handleBlur,handleChange,handleSubmit,handleReset,isSubmitting})=>{
               return (
                <Form onSubmit = {handleSubmit}>
                <div>
                    <div>
                    <label htmlFor = 'name'>Name</label>
                    </div>
                    
                        <input 
                        name= 'name' 
                        id= 'name'
                        type = 'text'
                        placeholder = 'Enter your name'
                        onChange = {handleChange} 
                        onBlur = {handleBlur} 
                        value ={values.name}
                        >
                        </input>  
                </div>

                <div>
                    <div>
                    <label htmlFor = 'description'>description</label>
                    </div>
                    
                        <input 
                        name= 'description' 
                        id= 'description'
                        type = 'text'
                        placeholder = 'Enter your description'
                        onChange = {handleChange} 
                        onBlur = {handleBlur} 
                        value ={values.description}
                        >
                            
                        </input>  
                </div>

               
                
                   <button type = 'submit' disabled = {isSubmitting}>
                       Submit
                   </button>
            

                </Form>
               )
              

            }}
            </Formik>
              
    
                
    )
}
export default FormikForm;