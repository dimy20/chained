import React from 'react'
import Styles from './PinPanel.module.css';
export default function PinPanel() {
    return (
        <div className = {Styles.container}>
            <div className = {Styles.ButtonsContainer}>
                <div className = {Styles.optionsButtonsContainer}>
                        
                <button className = {Styles.ShareButton}>A</button>
                <button className = {Styles.optionsButton}>B</button>
                </div>
                <button className = {Styles.GuardarButton}>Guardar</button>
            </div>
        </div>
    )
}
