import {useEffect,useState,useRef} from 'react';
import axios from 'axios';
const useProfile  = ()=>{
    const [DescriptionList,setDescriptionList] = useState([]);
    const [showModal,setshowModal] = useState(false);
    const ModalRef = useRef();
    

    //on Mounting
    useEffect(()=>{
        axios.get('http://localhost:5000/descriptions')
        .then(function (response) {
        if (!response){
            
        }
        // handle success
        console.log(response.data[0].description);
        setDescriptionList(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        console.log('reached here');
        });
        },[]);

    return [DescriptionList,showModal,setshowModal,ModalRef]
}
export default useProfile;