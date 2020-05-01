import React from 'react';
import Styles from './ProfileCard.module.css';
import {Link} from 'react-router-dom'
const ProfileCard = ({historys})=>{
    return (
            <div>
                <Link to='./profile'>
                <a href ='#'>
                            <div className  = {Styles.card} >
                            </div>
                        </a>
                </Link>
            </div>
    )
}
export default ProfileCard;