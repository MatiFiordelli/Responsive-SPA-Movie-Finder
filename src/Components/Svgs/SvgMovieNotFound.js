import React, { useState } from 'react'

export default function SvgMovieNotFound({classNameProp}){
    //"img-person-not-found"
    //"tv-movie-img-not-found"

    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={classNameProp} viewBox="0 0 32 32">
            <path fill="#b5b5b5" id="picture" d="M27.5,5H4.5A1.50008,1.50008,0,0,0,3,6.5v19A1.50008,1.50008,0,0,0,4.5,27h23A1.50008,1.50008,0,0,0,29,25.5V6.5A1.50008,1.50008,0,0,0,27.5,5ZM26,18.5l-4.79425-5.2301a.99383.99383,0,0,0-1.44428-.03137l-5.34741,5.34741L19.82812,24H17l-4.79291-4.793a1.00022,1.00022,0,0,0-1.41418,0L6,24V8H26Zm-17.9-6a2.4,2.4,0,1,1,2.4,2.4A2.40005,2.40005,0,0,1,8.1,12.5Z"/>
        </svg>
    )
}

