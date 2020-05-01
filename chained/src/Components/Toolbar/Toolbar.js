import React from 'react';
import {Button} from 'react-bootstrap';
import Styles from './Toolbar.module.css'
const Toolbar = ()=>{
    return(
        <div className = {Styles.container}>
            <div className= {Styles.btnContainer}>
            <Button className = {Styles.btn}>Logo</Button>
            <Button className = {Styles.btn}>Inicio</Button>{' '}
            <Button className = {Styles.btn}>Siguiendo</Button>{' '}
            </div>
            
            <input className = {Styles.input} placeholder = 'Search' type = 'text'></input>
            <div >
            <Button className = {Styles.btn}>Nots</Button>
            <Button className = {Styles.btn}>chat</Button>{' '}
            <Button className = {Styles.btn}>profile</Button>{' '}
            <Button className = {Styles.btn}>conf</Button>
            </div>
            
        </div>
    )
}
export default Toolbar;