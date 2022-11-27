import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchTermContext } from '../../../../GlobalState/context.js'


export default function SearchButton(){
    const navigate = useNavigate()
    const {searchTerm, setSearchTerm} = useContext(SearchTermContext)

    const setSearchEvent = (e) => {
        const el = document.querySelector('.search-bar__input')
        el.blur()
        el.value !== '' && navigate(`/search/${searchTerm}`)
    }

    return(
        <div 
            className="search-button"
            onClick={(e)=>setSearchEvent(e)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="magnifying-glass">
                <title/>
                    <g data-name="Layer 2" id="Layer_2">
                        <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/>
                    </g>
            </svg>
        </div>
    )
}