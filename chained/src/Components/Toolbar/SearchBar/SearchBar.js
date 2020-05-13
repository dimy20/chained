import React,{useContext} from 'react'
import {Formik} from 'formik';
import Styles from './SearchBar.module.css'
import SearchContext from '../../../SearchContext';
export default function SearchBar() {
    const {SearchString,setSearchString} = useContext(SearchContext);
    const handleChange = (e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setSearchString(e.target.value);
    }
    return (
        <form>
        <input
            name = 'SearchBar'
            id = 'SearchBar'
            type = 'text'
            placeholder = 'Search'
            className = {Styles.input}
            onChange = {handleChange}
        >
        </input>
   </form> 
    )
}
