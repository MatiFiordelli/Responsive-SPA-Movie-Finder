import React from 'react'
import { useNavigate } from 'react-router-dom'
import SvgHomeButton from '../../Svgs/SvgHomeButton'

export default function HomeButton() {
    const navigate = useNavigate()

    return(
        <div className="home-button-container">
            <span 
                className="home-button-container__button" 
                onClick={()=>navigate('/')}
            >
                <SvgHomeButton />
            </span> 
        </div>
    )
}