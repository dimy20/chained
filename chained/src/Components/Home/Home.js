import React from 'react';
import Styles from './Home.module.css';
import {InputGroup,FormControl} from 'react-bootstrap';
import ProfileCard from './ProfileCard/ProfileCard'
const Home = ({history})=>{
    return (
        <div className = {Styles.container}>

           <ProfileCard historys = {history}></ProfileCard>

            <InputGroup size="sm" className="mb-3">
              
                <InputGroup.Text id="inputGroup-sizing-sm">Q</InputGroup.Text>
                
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
        </div>        

    )
}
export default Home;