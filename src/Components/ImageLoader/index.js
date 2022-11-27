import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner'

export default function Image({src, alt, title, className, onClick, onMouseDown}){
    const signal = axios.CancelToken.source()
    const [imgUrl, setImgUrl] = useState()
    const [percentage, setPercentage] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        /* console.log(src) */
        const reader = new window.FileReader()
        const options = {
            method: 'GET',
            url: src,
            responseType: 'blob',
            params: {
              api_key: '4d1a073d6e646d93ce0400ffa3b8d13e',
            },
            cancelToken: signal.token,
            onDownloadProgress: (e)=>setPercentage(Math.round((e.loaded*100)/e.total))
        }
          
        axios(options)
        .then((res)=>{
            reader.onload = () => {
                setImgUrl(reader.result)
                //setLoading(true)
            }
            reader.readAsDataURL(res.data)
        })
        .catch((e)=>{
            if(axios.isCancel(e)){
                console.log(e.message)
            }
        })

        return ()=>{
            signal.cancel('Operation cenceled by the user')
        }
    },[src])

    useEffect(()=>{
        percentage===100
                        ?setLoading(false)
                        :setLoading(true)
    },[percentage])

    const onLoadImg = (e)=> {
        setLoading(false)
    }

    return(
       <>
        {loading
            ?<Spinner percentage={percentage} />
            :<img
                onLoad={(e)=>{onLoadImg(e)}}
                src={imgUrl}
                alt={alt}
                title={title}
                className={className}
                id="imgLoader"
                onClick={onClick}
                onMouseDown={onMouseDown}
            />
        }
        </>
    )
}