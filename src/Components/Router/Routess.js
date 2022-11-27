import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'

import Home from '../../Pages/Home'
import Main from '../../Pages/Home/Main'
import DetailsMovie from '../../Pages/DetailsMovie'
import PersonProfile from '../../Pages/PersonProfile'
import SearchResultsList from '../../Pages/SearchResultsList'

export default function Routess(){
    return(
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search/:terms" element={<SearchResultsList />} />
            <Route exact path="/details-movie/:movie_tvshow/:id" element={<DetailsMovie />} />
            <Route exact path="/person-profile/:persongroup/:id" element={<PersonProfile />} />
            {/* <Route exact path="*" element={<Navigate to="/" replace />} /> */}

        </Routes>
    )    
}