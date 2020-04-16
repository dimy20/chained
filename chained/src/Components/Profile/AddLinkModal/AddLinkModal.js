import React from 'react';
import {Modal,Button,InputGroup,FormControl,Form} from 'react-bootstrap';
import Styles from './AddLinkModal.module.css';
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
                <Form>
                    <Form.Group>
                        <Form.Label>Group name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        This name well be showed to other users.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group description</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                        <Form.Text className="text-muted">
                        Short description of what your group is about.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Save
                    </Button>
                </Form>
                
             </Modal.Body>

            <Modal.Footer>
                <Button onClick = {props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
           )
}
export default AddLinkModal;