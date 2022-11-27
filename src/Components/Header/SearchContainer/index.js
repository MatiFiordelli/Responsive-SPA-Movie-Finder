import React, {  useEffect, useState } from 'react'
import SearchButton from './SearchButton'
import SearchBar from './SearchBar'
import { SearchTermContext } from '../../../GlobalState/context.js'

export default function SearchContainer(){
    const [searchTerm, setSearchTerm] = useState('')
    sessionStorage.setItem('searchTerm', '')

    return(
        <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
            <div className="search-container">
                <SearchButton />
                <SearchBar />
            </div>
        </SearchTermContext.Provider>
    )
}