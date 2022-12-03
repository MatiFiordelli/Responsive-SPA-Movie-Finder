import React, { useState } from 'react'
import SearchButton from './SearchButton'
import SearchBar from './SearchBar'
import { SearchTermContext } from '../../../GlobalState/context.js'

export default function SearchContainer(){
    const [searchButtonStatus, setSearchButtonStatus] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    sessionStorage.setItem('searchTerm', '')

    return(
        <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
            <div className="search-container">
                <SearchButton 
                    searchButtonStatus={searchButtonStatus}
                    setSearchButtonStatus={setSearchButtonStatus}
                />
                <SearchBar
                    searchButtonStatus={searchButtonStatus}
                    setSearchButtonStatus={setSearchButtonStatus}
                />
            </div>
        </SearchTermContext.Provider>
    )
}