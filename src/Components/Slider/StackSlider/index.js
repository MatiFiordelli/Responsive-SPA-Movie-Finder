import React, { useEffect } from 'react'
import { slideStack } from '../../../UsefulFunctions/usefulFunctions.js'

export default function StackSlider({
                                    imagesPerMovie, 
                                    stackSliderVisibility, 
                                    setStackSliderVisibility, 
                                    urlImg}){
    
    let styles = {
        tX: -50,
        tY: -40,
        sY: 0,
        bl: 0,
        zI: 20
    }

    const updateStyles = () => {
        styles = {
            tX: styles.tX + 15,
            tY: styles.tY - 2,
            sY: styles.sY + 0.2,
            bl: styles.bl + 0.15,
            zI: styles.zI - 1
        }
        return styles.zI
    }

    useEffect(()=>{
        let sliderContainer = document.querySelector('#ssc')
        sliderContainer.childNodes[0]!==undefined &&
        slideStack(sliderContainer)
    })

    return(
        <div 
        
            className="stack-slider-overlay"
            style={{display:stackSliderVisibility}}
        >
            <div 
                className="stack-slider-overlay__close" 
                onClick={()=>stackSliderVisibility==='flex'
                                    ?setStackSliderVisibility('none')
                                    :setStackSliderVisibility('flex')}
            >×
            </div>
            <div className="stack-slider-container" id="ssc">
                {imagesPerMovie!==undefined && imagesPerMovie.posters.map((e,i)=>i<20 && (
                    <div 
                        className="stack-slider-items"
                        style= {{
                                backgroundImage:`url(${urlImg}${e.file_path})`,
                                transform: `translate(${styles.tX}%,${styles.tY}%) `,
                                filter: `blur(${styles.bl}px)`,
                                zIndex: updateStyles(),
                        }}//skewY(${styles.sY}deg)
                        key={i}
                    />
                ))
            }
            </div>
        </div>
    )
}