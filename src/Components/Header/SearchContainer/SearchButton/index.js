import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchTermContext } from '../../../../GlobalState/context.js'
import SvgSearchButton from '../../../Svgs/SvgSearchButton.js'

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
            <SvgSearchButton />
        </div>
    )
}