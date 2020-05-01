import React from 'react';
import {Button} from 'react-bootstrap';
import Styles from './Profile.module.css';
import AddLinkModal from './AddLinkModal/AddLinkModal';

//logic
import useProfile from './useProfile';
import Paper from '@material-ui/core/Paper'

const Profile = ()=>{
    const [DescriptionList,showModal,setshowModal,ModalRef] = useProfile();
    return (
        <div className = {Styles.Container}>
            <div className = {Styles.ButtonsContainer}>
                <Button onClick = {()=> setshowModal(true)} variant="primary">+</Button>
                <AddLinkModal
                    show = {showModal}
                    onHide = {()=> setshowModal(false)}
                >
                </AddLinkModal>
            
            </div>
            <div className = {Styles.DescriptionsContainer}>
            
                {DescriptionList.map((d)=>{
                    return <Paper key = {d._id}>{d.description}</Paper> 
                })}
        
            </div>
        </div>
    )
}
export default Profile;