import React from 'react'
import Styles from './Pin.module.css';

import PinImg from './PinImg/PinImg';
import PinPanel from './PinPanel/PinPanel';
 const Pin = (props)=> {
    return (
            <div className = {Styles.Wrapper}>
                <div className = {Styles.pin}>
                    <PinImg src = {props.location.state.src}></PinImg>
                    <PinPanel></PinPanel>
                </div>
            </div>
            
        
    )
}
export default Pin;
