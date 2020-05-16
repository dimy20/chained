import React from 'react'
import usePin from './usePin';
import Styles from './PinImg.module.css';
export default function PinImg(props) {

    return (
        <div>
            <img className = {Styles.img} src ={props.src} height = '100px'></img>
        </div>
    )
}
