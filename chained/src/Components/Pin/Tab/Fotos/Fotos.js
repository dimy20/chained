import React from 'react'
import Styles from './Fotos.module.css';
export default function Fotos() {
    return (
        <div className = {Styles.container}>
            <div className = {Styles.pContainer}>
            <strong><p className= {Styles.p}>Ya probaste este pin?</p></strong>
            <strong><p className= {Styles.p}>Agrega una foto para mostrar como ha ido</p></strong>
            </div>
            <button className = {Styles.AgregarFotoButton}>Agregar una foto</button>
            
        </div>
    )
}
