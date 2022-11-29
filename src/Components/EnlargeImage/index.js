import React, { useEffect, useState } from 'react'
import ImageLoader from '../ImageLoader'
import SvgRotateCellphone from '../Svgs/SvgRotateCellphone'

export default function EnlargeImage({image, enlargedImageVisibility, setEnlargedImageVisibility}){
    const [imageLoaderStatus, setImageLoaderStatus] = useState()
    const [rotateBigImage, setRotateBigImage] = useState('rotateZ(0deg)')

    useEffect(()=>{
        enlargedImageVisibility==='flex'
            ?setImageLoaderStatus(
                                <ImageLoader 
                                    src={image} 
                                    alt=""
                                    title="Click to Close" 
                                    className="big-image-container__item" 
                                    onClick={()=>{}}
                                    onMouseDown={()=>{}}
                                />
            )
            :setImageLoaderStatus('')
    },[enlargedImageVisibility])

    useEffect(()=>{
        return ()=>{
            setImageLoaderStatus('')
        }
    },[])

    return(
        <>
        {image!==undefined &&
            <div 
                className="big-image-overlay" 
                style={{display:enlargedImageVisibility}}>

                <div 
                    className="big-image-container" 
                    style={{transform: `/* translateZ(90deg) */ ${rotateBigImage}`}}
                    onClick={()=>
                        enlargedImageVisibility==='flex'
                            ?setEnlargedImageVisibility('none')
                            :setEnlargedImageVisibility('flex')}
                >
                    {imageLoaderStatus}
                    <div className="big-image-container__rotate-phone" onClick={()=>{rotateBigImage==='rotateZ(90deg)'
                                                                                            ?setRotateBigImage('rotateZ(0deg)')
                                                                                            :setRotateBigImage('rotateZ(90deg)')
                                                                                    }}>
                        {/* <SvgRotateCellphone /> */}
                    </div>
                    <div className="big-image-container__close">×</div>
                </div>
            </div>
        }
        </>
    )
}