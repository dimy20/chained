import React from 'react';
import Styles from './Card.module.css';

const Card = (props)=>{
    const {src} = props;
    return (
        <div>
            <img className = {Styles.container} src = {src} height = '200px'>
            </img>
        </div>
    )
}
export default Card;