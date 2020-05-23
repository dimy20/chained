import {useState,useEffect,useContext, useRef} from 'react';
import ImagesContext from '../../ImagesContext';
import axios from 'axios';
const useHome = (query,imgNumber)=>{
     const [Loading,setLoading] = useState(true);
     const [Err,setErr] = useState(false);
     const [ImgArr,setImgArr] = useState([]);
     const [hasMore,setHasMore] = useState(false);
     const {ImgArrContext,setImgArrContext} = useContext(ImagesContext);
     useEffect(()=>{
        setImgArrContext(ImgArr)
        console.log(ImgArrContext);
     },[ImgArr])
     useEffect(()=>{
        setImgArr([]);
     },[query]);

     useEffect(()=>{
        setLoading(true);
        let cancel;
        axios({
            method : 'GET',
            url :`https://pixabay.com/api/?key=16381049-c197cfa5caeabac8c93d8da2c&q=${query}&image_type=photo&per_page=${21}&page=${imgNumber}`,
            cancelToken : new axios.CancelToken((c)=> cancel = c)
        })
        .then(response=>{
            //FIX THIS REPETTITIOS
            console.log(response.data.hits[0].id);
            setImgArr(prevImgs=>{
                return [...new Set([...prevImgs,...response.data.hits])]
            });
            setLoading(false);
        }).catch(err=>{
            //ignore everytime we cancel the request
            if(axios.isCancel(err)){
                return
            }
            setErr(true);
        })
        return ()=> cancel();
    },[query,imgNumber])   

    return {Loading,Err,ImgArr,hasMore}
}
export default useHome;
