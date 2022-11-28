import React, { useEffect, useState } from 'react'
import ImageLoader from '../ImageLoader'

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
                        {/* <svg className="rotate-phone" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"> 
                            <g>
                                <path d="m379.12 108.08c-12.32-21.281-39.199-29.121-61.039-16.801l-113.68 64.402c-21.281 12.32-29.121 39.199-16.801 61.039l133.28 235.2c12.32 21.281 39.199 29.121 61.039 16.801l113.68-64.398c21.281-12.32 29.121-39.199 16.801-61.039zm-51.52 327.6-123.2-216.72 168-94.641 123.2 216.72zm126-353.92 2.8008-8.3984c1.1211-3.3594 0.55859-6.7188-1.6797-9.5195-2.2383-2.8008-5.6016-4.4805-8.9609-3.9219l-47.039 3.9219c-5.0391 0.55859-9.5195 4.4805-9.5195 9.5195-0.55859 5.0391 3.3594 10.078 8.3984 10.641 13.441 2.8008 26.879 7.2812 39.199 12.879 38.641 17.359 70 45.922 91.281 82.879 28 49.281 33.602 107.52 15.121 161.28-1.6797 5.6016 1.1211 11.199 6.7188 13.441 2.8008 1.1211 6.1602 0.55859 8.3984-0.55859 2.2383-1.1211 3.9219-3.3594 4.4805-5.6016 20.16-58.801 14-123.76-16.801-178.08-21.84-39.207-53.762-69.445-92.398-88.484zm-207.2 396.48-2.7969 8.4023c-1.1211 3.3594-0.55859 6.7188 1.6797 9.5195 2.2383 2.8008 5.6016 4.4805 8.9609 3.9219l47.039-3.9219c1.6797 0 2.8008-0.55859 4.4805-1.1211 2.8008-1.6797 5.0391-5.0391 5.0391-8.3984 0.55859-5.0391-3.3594-10.078-8.3984-10.641-13.441-2.8008-26.879-7.2812-39.199-12.879-38.641-17.359-70-45.922-91.281-82.879-28-49.281-33.602-107.52-15.121-161.28 1.6797-5.6016-1.1211-11.199-6.7188-13.441-5.6016-1.6797-11.199 1.1211-13.441 6.7188-20.16 58.801-14 123.76 16.801 178.08 22.398 38.645 54.32 68.883 92.957 87.922z"/>
                                <use x="70" y="654" />
                                <use x="90.550781" y="654" />
                                <use x="104.359375" y="654" />
                                <use x="123.347656" y="654" />
                                <use x="142.242188" y="654" />
                                <use x="155.628906" y="654" />
                                <use x="174.617188" y="654" />
                                <use x="204.410156" y="654" />
                                <use x="224.453125" y="654" />
                                <use x="252.453125" y="654" />
                                <use x="266.261719" y="654" />
                                <use x="275.859375" y="654" />
                                <use x="295.902354" y="654" />
                                <use x="315.835938" y="654" />
                                <use x="335.070312" y="654" />
                                <use x="355.113281" y="654" />
                                <use x="374.007812" y="654" />
                                <use x="394.050781" y="654" />
                                <use x="412.945312" y="654" />
                                <use x="70" y="682" />
                                <use x="82.183594" y="682" />
                                <use x="95.992188" y="682" />
                                <use x="115.226562" y="682" />
                                <use x="154.152344" y="682" />
                                <use x="167.535156" y="682" />
                                <use x="187.46875" y="682" />
                                <use x="216.207031" y="682" />
                                <use x="239.640625" y="682" />
                                <use x="258.878906" y="682" />
                                <use x="278.8125" y="682" />
                                <use x="308.492188" y="682" />
                                <use x="329.015625" y="682" />
                                <use x="342.820312" y="682" />
                                <use x="362.058594" y="682" />
                                <use x="371.65625" y="682" />
                                <use x="390.648438" y="682" />
                                <use x="407.242188" y="682" />
                            </g>
                        </svg> */}
                    </div>
                    <div className="big-image-container__close">×</div>
                </div>
            </div>
        }
        </>
    )
}