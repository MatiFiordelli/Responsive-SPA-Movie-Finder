import React, { useEffect} from 'react'
import SvgSearchButton from '../../../Svgs/SvgSearchButton'
import SvgLeftArrowHideSearchInput from '../../../Svgs/SvgLeftArrowHideSearchInput'

export default function SearchButton({searchButtonStatus, setSearchButtonStatus}){
    const exchangeButton = () => {
        setSearchButtonStatus(()=>!searchButtonStatus)
    }

    useEffect(()=>{
        const sb=document.querySelector('.search-button')
        !searchButtonStatus
            ?sb.style.backgroundColor='#000'
            :sb.style.backgroundColor='#F00'
    },[searchButtonStatus])

    return(
        <div 
            className="search-button"
            onClick={(e)=>exchangeButton(e)}
        >
        {searchButtonStatus
            ?<SvgLeftArrowHideSearchInput />
            :<SvgSearchButton />
        }
        </div>
    )
}