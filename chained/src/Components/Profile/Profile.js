import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import Styles from './Profile.module.css';
import AddLinkModal from './AddLinkModal/AddLinkModal';
//logic
import useProfile from './useProfile';
const Profile = ()=>{
    const [showModal,setshowModal] = useState(false);
    return (
        <div className = {Styles.container}>
            <h1 className = {Styles.title}>No titles added yet</h1>
            <Button onClick = {()=> setshowModal(true)} variant="primary">+</Button>
            <AddLinkModal
                show = {showModal}
                onHide = {()=> setshowModal(false)}
            >
            </AddLinkModal>
        </div>
    )
}
export default Profile;