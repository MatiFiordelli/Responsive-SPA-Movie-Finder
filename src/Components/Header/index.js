import React, { useState } from 'react'
import SearchContainer from '../Header/SearchContainer'
import Genres from '../Header/Genres'
import LanguageButton from '../Header/LanguageButton'
import TopOfPageButton from '../Header/TopOfPageButton'
import HomeButton from './HomeButton'

export default function Header(){

    //Hide the Search Bar on scroll
    const [headerTop, setHeaderTop] = useState('0px')
    let prevScrollPos2 = window.scrollY

    const hideSearchBar = () => {
        let currentScrollPos = window.scrollY

        //Controls if the scrollY is up or down
        prevScrollPos2 < currentScrollPos
            ?setHeaderTop('-40px')
            :setHeaderTop('0px')

        prevScrollPos2 = currentScrollPos
    }

    document.onscroll = (e) => {
        hideSearchBar()
    }

    document.onmousemove = (e) => {
        if(e.clientY<='50'){
            setHeaderTop('0px')
        }
    }

    return(
        <section 
            className="header"
            style={{top:headerTop}}
            tabIndex="1"
        >
            <SearchContainer />
            <Genres />
            <div className="header__right-section">
                <HomeButton />
                <TopOfPageButton />                
                <LanguageButton />
            </div>
        </section>
    )
}