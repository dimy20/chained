import React, { useState,useContext, useEffect, useRef, useCallback } from 'react';
import Styles from './Home.module.css';
import {CircularProgress} from '@material-ui/core';

//components
import Card from './Card/Card';
//hooks 
import useHome from './useHome';
//context
import SearchContext from '../../SearchContext';
import ImagesContext from '../../ImagesContext';
const Home = ({history})=>{
    const {SearchString,setSearchString} = useContext(SearchContext);
    
    const [imgNumber,setimgNumber] = useState(1);
    const {Loading,err,ImgArr,hasMore} = useHome(SearchString,imgNumber);

    const observer = useRef();
    const lastImgElement = useCallback((node)=>{
        if(Loading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries=>{
            console.log(entries);
            if(entries[0].isIntersecting){
                console.log('visible');
                setimgNumber(previmgNumber=>previmgNumber+1);
            }
        })
        if(node){
            observer.current.observe(node);
        }
        console.log(node);
    },[Loading])
    console.log(ImgArr)
    
    return (
        <div className = {Styles.container}>
            {Loading &&
               <div className = {Styles.loadingContainer}>
                    <h1 className ={Styles.Loading}>Loading...</h1>
               </div>        
            }
            <div className = {Styles.CardContainer}>
            {ImgArr.map((img,index)=>{
                if(ImgArr.length === index +1){
                    return  <div ref = {lastImgElement}><Card key = {img.id} src = {img.largeImageURL}  ></Card></div> 
                }else{ 
                    return <Card history = {history} key = {img.id} src = {img.largeImageURL}></Card>
                }
               
            })}
            </div>   
        </div>      

    )
}
export default Home;
