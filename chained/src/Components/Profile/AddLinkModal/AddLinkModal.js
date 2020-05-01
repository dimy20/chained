import React,{forwardRef} from 'react';
import {Modal,Button} from 'react-bootstrap';
/* import Styles from './AddLinkModal.module.css';*/
import FormikForm from '../../FormikForm/FormikForm';

const AddLinkModal = (props)=>{
    return(
        
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h1>Create a new group</h1>
            </Modal.Header>
            <Modal.Body>
                <FormikForm></FormikForm>
             </Modal.Body>

            <Modal.Footer>
                <Button onClick = {props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
           )
}
const forwardAddLinkModal = forwardRef(AddLinkModal)
export default forwardAddLinkModal;