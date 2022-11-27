import React, { useState, useEffect } from 'react'
import ImageLoader from '../../../ImageLoader'

export default function HorizontalSliderContent({e, target, id}){
    const [objEntries, setObjEntries] = useState()

    useEffect(()=>{
        if(target==='person-profile'){
            setObjEntries({
                    img: e.profile_path,
                    title: e.name,
                    subtitle1: id==="cast"?e.character:e.job,
                    subtitle2: '',
                    svg: <svg className="img-person-not-found" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                             <path fill="#b5b5b5" id="person" d="M27,25.23669V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V24.23669a1.57806,1.57806,0,0,1,.93115-1.36462L10.0672,20.167A5.02379,5.02379,0,0,0,14.55273,23h1.89454a5.02336,5.02336,0,0,0,4.48535-2.83313l5.13623,2.7052A1.57806,1.57806,0,0,1,27,24.23669ZM9.64478,14.12573a2.99143,2.99143,0,0,0,1.31073,1.462l.66583,3.05176A2.99994,2.99994,0,0,0,14.55237,21h1.89526a2.99994,2.99994,0,0,0,2.931-2.36047l.66583-3.05176a2.99115,2.99115,0,0,0,1.31073-1.462l.28-.75146A1.2749,1.2749,0,0,0,21,11.62988V9c0-3-2-5-5.5-5S10,6,10,9v2.62988a1.2749,1.2749,0,0,0-.63519,1.74439Z"/>
                         </svg>
                }
            )
        }

        if(target==='details-movie'){
            setObjEntries({
                    img: e.poster_path,
                    title: e.title,
                    subtitle1: e.character,
                    subtitle2: e.release_date!==undefined && e.release_date.slice(0,4),
                    svg: <svg xmlns="http://www.w3.org/2000/svg" className="img-person-not-found" viewBox="0 0 32 32">
                            <path fill="#b5b5b5" id="picture" d="M27.5,5H4.5A1.50008,1.50008,0,0,0,3,6.5v19A1.50008,1.50008,0,0,0,4.5,27h23A1.50008,1.50008,0,0,0,29,25.5V6.5A1.50008,1.50008,0,0,0,27.5,5ZM26,18.5l-4.79425-5.2301a.99383.99383,0,0,0-1.44428-.03137l-5.34741,5.34741L19.82812,24H17l-4.79291-4.793a1.00022,1.00022,0,0,0-1.41418,0L6,24V8H26Zm-17.9-6a2.4,2.4,0,1,1,2.4,2.4A2.40005,2.40005,0,0,1,8.1,12.5Z"/>
                        </svg>
                }
            )
        }
    },[e])

    return(
        <>
            {objEntries!==undefined && objEntries.img!==null
                ?<ImageLoader 
                        src={`https://image.tmdb.org/t/p/w200/${objEntries.img}`}
                        className="slider-inner__item-image" 
                        alt={objEntries.title} 
                        title={objEntries.title}
                />
                :<>{objEntries!==undefined && objEntries.svg}</>
            }

            {objEntries!==undefined &&
            <>    
                <div className="slider-inner__item-title">{objEntries.title}</div>
                <div className="slider-inner__item-subtitle1">{objEntries.subtitle1}</div>
                <div className="slider-inner__item-subtitle2">{objEntries.subtitle2}</div>
            </>
            }
        </>
    )
}