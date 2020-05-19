import React from 'react'
import Styles from './Comentarios.module.css'
import {Avatar} from '@material-ui/core';
export default function Comentarios() {
    return (
        <div className = {Styles.Container}>
            <p>Comparte tus comentarios, haz preguntas o haz un cumplido</p>
            <div className = {Styles.WrapperOne}>
            <Avatar className = {Styles.avatar}>H</Avatar> 
            <textarea placeholder = 'Agregar un comentario' className = {Styles.TextArea} cols = '10' rows = '1'></textarea>
              
            </div>
             
        </div>
    )
}
