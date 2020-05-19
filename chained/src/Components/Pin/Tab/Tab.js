import React,{useState} from 'react'
import {Tabs} from 'react-bootstrap';
import Styles from './Tab.module.css';
import Fotos from './Fotos/Fotos';
import Comentarios from './Comentarios/Comentarios'
export default function Tab() {
    const [isFotosActive, setisFotosActive] = useState(false);
    const [isComentariosActive, setisComentariosActive] = useState(false);

    const handleFotosClick = ()=>{
        setisFotosActive(true);
        setisComentariosActive(false);
    };
    const handleComentariosClick = ()=>{
        setisFotosActive(false);
        setisComentariosActive(true);
    };

    return (
        <div>
            <button onClick = {handleFotosClick} className = {Styles.Fotos}>Fotos</button>
            <button onClick = {handleComentariosClick} className = {Styles.Comentarios}>Comentarios</button>
            <div className= {Styles.DisplayArea}>
                {isFotosActive && <Fotos></Fotos>}
                {isComentariosActive && <Comentarios></Comentarios>}

            </div>
        </div>
    )
}
