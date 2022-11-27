import React, { useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SearchTermContext } from '../../../../GlobalState/context.js'

export default function SearchBar(){
    const searchBar = useRef('')
    const navigate = useNavigate()
    const {searchTerm, setSearchTerm} = useContext(SearchTermContext)
const params = useParams()
    useEffect(()=>{
        setSearchTerm(sessionStorage.getItem('searchTerm')/* .replaceAll(/[<>.]/g,'') */)
        sessionStorage.getItem('searchTerm')==='' && 
            sessionStorage.getItem('isSearching')===false && 
                navigate('/')
    },[])

    useEffect(()=>{
        sessionStorage.setItem('searchTerm', searchTerm)        
    },[searchTerm])

    const setSearchEvent = (e) => {
        e.target.blur()
        e.target.value !== '' && navigate(`/search/${e.target.value}`)
    }

    const clearSearchBarInput = () => {
        setSearchTerm('')
        sessionStorage.setItem('searchTerm','')
        searchBar.current.focus()
    }

    return(
        <div className="search-bar">
            <input 
                type="text" 
                className="search-bar__input"
                ref={searchBar}
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
        </div>
    )
}