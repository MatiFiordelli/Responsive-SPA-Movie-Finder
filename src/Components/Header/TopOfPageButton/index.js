import React from 'react'

export default function TopOfPage(){
    return(
        <div className="top-of-page-button-container">
            <span 
                className="top-of-page-button-container__button" 
                onClick={()=>window.scrollTo(0,0)}
                data-text="TOP"
            >
                TOP
            </span> 
        </div>
    )
}