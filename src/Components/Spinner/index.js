import React from 'react'

export default function Spinner({percentage}){

    return(
        <div className="spinner-container slider-inner__item-image" id="a1">
            <div className="spinner-container__circle"/>
            <p className="spinner-container__percentage">{percentage===undefined?'0':percentage}%</p>
        </div>
    )
}