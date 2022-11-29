import React, { useState, useEffect } from 'react'
import ImageLoader from '../../../ImageLoader'
import SvgPersonNotFound from '../../../Svgs/SvgPersonNotFound'
import SvgMovieNotFound from '../../../Svgs/SvgMovieNotFound'

export default function HorizontalSliderContent({e, target, id}){
    const [objEntries, setObjEntries] = useState()

    useEffect(()=>{
        if(target==='person-profile'){
            setObjEntries({
                    img: e.profile_path,
                    title: e.name,
                    subtitle1: id==="cast"?e.character:e.job,
                    subtitle2: '',
                    svg: <SvgPersonNotFound />
                }
            )
        }

        if(target==='details-movie'){
            setObjEntries({
                    img: e.poster_path,
                    title: e.title,
                    subtitle1: e.character,
                    subtitle2: e.release_date!==undefined && e.release_date.slice(0,4),
                    svg: <SvgMovieNotFound classNameProp='img-person-not-found'/>
                }
            )
        }
    },[e])

    useEffect(()=>{
        return ()=>{
            setObjEntries({})
        }
    },[])

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