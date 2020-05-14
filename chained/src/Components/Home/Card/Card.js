import React, {useRef,useState} from 'react';
import Styles from './Card.module.css';
import {Button} from '@material-ui/core';
import {Avatar} from '@material-ui/core'
const Card = (props)=>{
    const {src} = props;
    const [IsHovered, setIsHovered] = useState(false);
    const handleOnMouseOver = ()=>{
        setIsHovered(true);
    }
    const handleOnMouseLeave = ()=>{
        setIsHovered(false);
    }

    return (
        <div onMouseLeave = {handleOnMouseLeave} onMouseOver= {handleOnMouseOver} className = {Styles.Wrapper}>
                <img className = {IsHovered ? Styles.imgOnHover : Styles.img} src = {src} height = '200px'>
                </img>
                    {IsHovered &&                        
                        <button className = {Styles.GuardarButtonVisible}>
                        GUARDAR
                        </button>  
                    }
                    {IsHovered &&
                        <div>
                            <button className = {Styles.OptionsButton}>...</button>
                        </div>
                    }       
        </div>
    )
}
export default Card;