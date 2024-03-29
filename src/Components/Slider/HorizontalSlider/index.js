import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sliderMouseDown, detectClickVsDrag, slide } from '../../../Modules/usefulFunctions.js'
import HorizontalSliderContent from '../HorizontalSlider/HorizontalSliderContent'

export default function HorizontalSlider({ id, data, target }){
    const navigate = useNavigate()
    const [clickVsTouchCoordinates, setClickVsTouchCoordinates] = useState([])

    useEffect(()=>{
        let sliderContainer = document.querySelector(`#sc${id}`)
        let slider = document.querySelector(`#s${id}`)

        slide(sliderContainer, slider)

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[document.querySelector('slider-inner')])

    return(
        <div className="slider-container" id={`sc${id}`}>
            <div className="slider-inner" id={`s${id}`}>
                {data!==undefined && data.map((e,i)=>( 
                <Fragment key={i}>
                    {e.adult!==true &&
                    <div 
                        className="slider-inner__item" 

                        onMouseDown={(ev)=>sliderMouseDown(ev,setClickVsTouchCoordinates)} 
                        onMouseUp={(ev)=>
                                        detectClickVsDrag(ev, clickVsTouchCoordinates) &&
                                        navigate(`/${target}/${id}/${e.id}`)}

                        onTouchStart={(ev)=>sliderMouseDown(ev,setClickVsTouchCoordinates)} 
                        onTouchEnd={(ev)=>
                                        detectClickVsDrag(ev, clickVsTouchCoordinates) &&
                                        navigate(`/${target}/${id}/${e.id}`)}
                    >

                        <HorizontalSliderContent e={e} target={target} id={id}/>
                    </div>
                    }
                </Fragment>
                ))}
            </div>
        </div>
    )
}