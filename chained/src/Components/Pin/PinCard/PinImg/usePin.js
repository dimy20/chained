import ImagesContext from '../../../ImagesContext';
import {useContext,useEffect} from 'react';
const usePin = ()=>{
    const {ImgArrContext,setImgArrContext} = useContext(ImagesContext);
    useEffect(() => {
        console.log(ImgArrContext);
    }, [ImgArrContext])
};
export default usePin;