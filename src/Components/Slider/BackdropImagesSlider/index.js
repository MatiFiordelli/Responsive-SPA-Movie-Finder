import React, { useState, useEffect } from 'react'
import { slideBackdrop, detectClickVsDrag, sliderMouseDown } from '../../../Modules/usefulFunctions.js'
import EnlargeImage from '../../EnlargeImage/index.js'

export default function BackdropImagesSlider({imagesData, parallax, origin, title}){
    const [enlargedImageOrigin, setEnlargedImageOrigin] = useState()
    const [enlargedImageVisibility, setEnlargedImageVisibility] = useState('none')
    const [clickVsTouchCoordinates, setClickVsTouchCoordinates] = useState([])
    const [imagesDataOrigin, setImagesDataOrigin] = useState()
    const [positionIndexState, setPositionIndexState] = useState(0)
    const urlImg = 'https://image.tmdb.org/t/p/original'

    const enlargedImageVisibilityFcn = (ev, e) => {
        //Display full image
        if(detectClickVsDrag(ev, clickVsTouchCoordinates)){
            enlargedImageVisibility==='flex'
                ?setEnlargedImageVisibility('none')
                :setEnlargedImageVisibility('flex')

            setEnlargedImageOrigin(`${urlImg}${getPath(e)}`)
        }
    }

    const getTitle = (e) => {
        if(origin==="cast" || origin==="crew"){
            return e.title
        }else {
            return title
        }
    }

    const getPath = (e) => {
        if(origin==="cast" || origin==="crew"){
            return e.backdrop_path
        }
        if(origin==="movie"){
            return e.file_path
        }
    }

    useEffect(()=>{
        if(imagesData!==undefined){
            origin==="cast" && setImagesDataOrigin(imagesData.cast)
            origin==="crew" && setImagesDataOrigin(imagesData.crew)
            origin==="movie" && setImagesDataOrigin(imagesData.backdrops)
        }
    },[imagesData])

    useEffect(()=>{
        let sliderContainer = document.querySelector('#bdisc')
        let slider = document.querySelector('#bdis')
        slideBackdrop(sliderContainer, slider, parallax, setPositionIndexState)
    },[])

    useEffect(()=>{
        //navigation dots
        let el = document.querySelectorAll('.backdrop-image-slider-navigation__item')
        if(el.length!==0){
            el.forEach((e,i)=>{
                e.style.backgroundColor='#FFF'
            })
            
            el[positionIndexState].style.backgroundColor = '#F00'
        }
    },[positionIndexState])

    return(
        <>
            <EnlargeImage 
                image={enlargedImageOrigin}
                enlargedImageVisibility={enlargedImageVisibility}
                setEnlargedImageVisibility={setEnlargedImageVisibility} />
                            
            <div className="backdrop-image-slider-container" id="bdisc">
                <nav className="backdrop-image-slider-navigation">
                        
                    {imagesDataOrigin!==undefined &&
                        imagesDataOrigin.map((e,i)=>{
                                return (
                                    i<=100 && e.backdrop_path!==null &&  
                                        <div 
                                            className="backdrop-image-slider-navigation__item"
                                            key={i}
                                        />)
                        })
                    }
                </nav>
                <div className="backdrop-image-slider" id ="bdis">
                    {imagesDataOrigin!==undefined &&
                        imagesDataOrigin.map((e,i,array)=>( 
                            getPath(e)!==null && i<=100 &&
                            <div
                                className="backdrop-image-slider-item" 
                                style={{backgroundImage: `url(${urlImg}${getPath(e)}`, 
                                        cursor: `${array.length>1
                                                    ?"grab" 
                                                    :"default"}`
                                }}
                                key={i}
                                title={getTitle(e)}
                                
                                /* onClick={()=>document.querySelector('.header').style.top='-40px'} */
                                onMouseDown={(ev)=>sliderMouseDown(ev, setClickVsTouchCoordinates)}
                                onMouseUp={(ev)=>enlargedImageVisibilityFcn(ev, e)}
                                onTouchStart={(ev)=>sliderMouseDown(ev, setClickVsTouchCoordinates)}
                                onTouchEnd={(ev)=>enlargedImageVisibilityFcn(ev, e)}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}