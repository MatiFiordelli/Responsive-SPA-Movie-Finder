import React, { useEffect, useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SearchTermContext } from '../../../../GlobalState/context'
import SvgSearchButton from '../../../Svgs/SvgSearchButton'

export default function SearchBar({searchButtonStatus, setSearchButtonStatus}){
    const location = useLocation()
    const searchBarInput = useRef('')
    const navigate = useNavigate()
    const {searchTerm, setSearchTerm} = useContext(SearchTermContext)
    
    useEffect(()=>{
        setSearchTerm(sessionStorage.getItem('searchTerm')/* .replaceAll(/[<>.]/g,'') */)
        sessionStorage.getItem('searchTerm')==='' && 
            sessionStorage.getItem('isSearching')===false && 
                navigate('/')

    },[])

    useEffect(()=>{
        sessionStorage.setItem('searchTerm', searchTerm)  

    },[searchTerm])

    useEffect(()=>{
        location.pathname.split('/')[1] !== 'search' &&
            setSearchButtonStatus(false)
        
    },[location])

    useEffect(()=>{
        searchButtonStatus
            ?searchBarInput.current.focus()
            :searchBarInput.current.blur()
            
    },[searchButtonStatus])

    const setSearchEvent = () => {
        searchBarInput.current.blur()
        searchBarInput.current.value !== '' && navigate(`/search/${searchBarInput.current.value}`)
    }

    const clearSearchBarInput = () => {
        setSearchTerm('')
        sessionStorage.setItem('searchTerm','')
        searchBarInput.current.focus()
    }

    return(
        <div 
            className="search-bar" 
            style={{width: searchButtonStatus?'100%':'0'}}
        >
            <input 
                type="text" 
                className="search-bar__input"
                ref={searchBarInput}
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value)}} 
                placeholder="Write the name of a Movie" 
                onFocus={(e)=>e.target.parentNode.parentNode.parentNode.style.opacity='1'}
                onBlur={(e)=>e.target.parentNode.parentNode.parentNode.style.opacity='0.2'}
                onKeyDown={(e)=>e.key==='Enter' && setSearchEvent(e)}
            />
            <span 
                className="search-bar__clear" 
                onClick={()=>clearSearchBarInput()}
            >×
            </span>
            <span 
                className="search-bar__magnifying-glass-container"
                onClick={(e)=>setSearchEvent(e)}
            >
                <SvgSearchButton />
            </span>
        </div>
    )
}