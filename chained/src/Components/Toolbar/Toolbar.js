import React from 'react';
import {Button} from 'react-bootstrap';
import Styles from './Toolbar.module.css';
import {Avatar} from '@material-ui/core'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
const Toolbar = ()=>{
    return(
        <div className = {Styles.container}>
            <div className= {Styles.btnContainer}>
            <Button className = {Styles.btn}>Logo</Button>
            <Button className = {Styles.btn}>Inicio</Button>{' '}
            <Button className = {Styles.btn}>Siguiendo</Button>{' '}
            </div>
            
            <input className = {Styles.input} placeholder = 'Search' type = 'text'></input>
            <div className = {Styles.btnOptionesContainer}>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            </div>
            
        </div>
    )
}
export default Toolbar;