import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeButton() {
    const navigate = useNavigate()

    return(
        <div className="home-button-container">
            <span 
                className="home-button-container__button" 
                onClick={()=>navigate('/')}
            >
                <svg viewBox="0 0 24 24" id="svg-home">
                    <path d="M3 10v11h6v-7h6v7h6v-11L12,3z"/>
                </svg>
            </span> 
        </div>
    )
}