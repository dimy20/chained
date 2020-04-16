import {useState, useRef,useEffect} from 'react';
const useProfile = ()=>{
    const [ShowModal, setShowModal] = useState(false);
    const ButtonRef = useRef();
    const handleClick = ()=>{
        setShowModal(true);
    }
    useEffect(()=>{
        ButtonRef.current.addEventListener('onClick',handleClick);
        return ButtonRef.current.removeEventListener('onClick',handleClick); 
    })
    return [ButtonRef,ShowModal,setShowModal];
}
export default useProfile;