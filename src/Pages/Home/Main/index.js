import React, { useEffect, useRef, useState,useContext } from 'react'
import axios from 'axios'
import HorizontalSlider from '../../../Components/Slider/HorizontalSlider'
import { LanguageContext } from '../../../GlobalState/context'
import TitlesTranslator from '../../../Components/TitlesTranslator'

export default function Main(){
    const signal = axios.CancelToken.source()
    const apiKey = '4d1a073d6e646d93ce0400ffa3b8d13e'
    const { languageCodeState } = useContext(LanguageContext)
    const previousLanguage = useRef()
    const idxImg = useRef()
    const [rainedText, setRainedText] = useState()
    const [urlBackdropPath, setUrlBackdropPath] = useState()
    const [latest, setLatest] = useState()
    const [nowPlaying, setNowPlaying] = useState()
    const [popular, setPopular] = useState()
    const [topRated, setTopRated] = useState()
    const [upcoming, setUpcoming] = useState()
    const [discover, setDiscover] = useState()
    const [trending, setTrending] = useState()
    const urlImg = 'https://image.tmdb.org/t/p/original/'
    const urlArray = [
        `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=AR`,
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=BR`,
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=US`,
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=US`,
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${languageCodeState}&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&region=US`,
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`
    ]

    const fetchData = (url, setState) => {
        axios.get(url, {cancelToken: signal.token})
        .then((res)=>{
            setState(res.data)
        })
        .catch((e)=>{
            if(axios.isCancel(e)){
                console.log(e.message)
            }
        })
    }

    const contentUseEffect = () => {
        fetchData(urlArray[0], setLatest)
        fetchData(urlArray[1], setNowPlaying)
        fetchData(urlArray[2], setPopular)
        fetchData(urlArray[3], setTopRated)
        fetchData(urlArray[4], setUpcoming)
        fetchData(urlArray[5], setDiscover)
        fetchData(urlArray[6], setTrending)
    }

    useEffect(()=>{
        contentUseEffect()
        previousLanguage.current = languageCodeState

        window.scrollTo(0,0)
        
        return ()=>{
            signal.cancel('Operation canceled by the user')
            window.onscroll = () => {}
        }
    },[])
    
    useEffect(()=>{
        if(previousLanguage.current !== languageCodeState){
            contentUseEffect()
        }
    
        return ()=>{
            signal.cancel('Operation canceled by the user')
        }
    },[languageCodeState])

    const randomMovie = () => {
        if(popular!==undefined){
            if(previousLanguage.current === languageCodeState){
                idxImg.current = Math.floor(Math.random() * 19)
            }
            setUrlBackdropPath(`${urlImg}${popular.results[idxImg.current].backdrop_path}`)
            let rainedTxt = popular.results[idxImg.current].title
            setRainedText(rainedTxt.split(''))
        }
    }

    useEffect(()=>{
        randomMovie()
    },[popular])

    useEffect(()=>{
        const el = document.querySelector('.main-container__rained-text')

        if(rainedText!==undefined){
            let htmlRainedText = '<div class="main-container__rained-text-word">'
            htmlRainedText += rainedText.map((e,i)=>(`<span class="main-container__rained-text-word-letter">${e===' '?'</div><div class="main-container__rained-text-word">':e}</span>`))
            htmlRainedText += '</div>'
                 
            el.innerHTML = htmlRainedText.toString().replaceAll(',',' ')

            const elements = Object.values(el.children)
            //const theRules = document.styleSheets[3].rules[5][2].parentStyleSheet.cssRules[5].cssText
            
            for(let i in elements){
                let word = elements[i]
                Array.from(word.children).map((e,j,arr)=>{
                    e.style.animationDelay = `${Math.floor(Math.random()*150)*(9)}ms`
                })
            }
        }                                                       
    },[rainedText])


    let prevScrollPos = window.scrollY
    window.onscroll = () => {
        let currentScrollPos = window.scrollY
        let distancePixels
        let el = document.querySelector('.main-container__latest')

        //Controls if the scrollY is up or down
		if(prevScrollPos < currentScrollPos){
            //scrolling down
            distancePixels = window.scrollY
            el.style.backgroundPosition = `center -${distancePixels*1.4}px`
        }else{
            //scrolling up
            distancePixels = window.scrollY
            el.style.backgroundPosition = `center -${distancePixels*1.4}px`
        }     
        prevScrollPos = currentScrollPos

        
        document.querySelector('.header').style.opacity = '0.2'
        document.querySelector('.search-bar .search-bar__input').blur()
    }
    

    return(
        <div className='main-container'>
            {popular!==undefined &&
                <div 
                    className="main-container__latest" 
                    style={{backgroundImage: `url(${urlBackdropPath})`}}
                >
                    <div className="main-container__rained-text" />
                </div>
            }

            <p className='main-container__titles'>
                <TitlesTranslator title={"Trending Today"} language={languageCodeState} />
            </p>
            {trending!==undefined &&
                <HorizontalSlider
                    id={'trending'}
                    data={trending.results}
                    target="details-movie"    
                />
            }
        
            <p className='main-container__titles'>
                <TitlesTranslator title={"In Theaters"} language={languageCodeState} />
            </p>
            {nowPlaying!==undefined &&
                <HorizontalSlider
                    id={'intheaters'}
                    data={nowPlaying.results}
                    target="details-movie"    
                />
            }

            <p className='main-container__titles'>
                <TitlesTranslator title={"Popular"} language={languageCodeState} />
            </p>
            {popular!==undefined &&
                <HorizontalSlider
                    id={'popular'}
                    data={popular.results}
                    target="details-movie"    
                />
            }

            <p className='main-container__titles'>
                <TitlesTranslator title={"Top Rated"} language={languageCodeState} />
            </p>
            {topRated!==undefined &&
                <HorizontalSlider
                    id={'toprated'}
                    data={topRated.results}
                    target="details-movie"    
                />
            }

            <p className='main-container__titles'>
                <TitlesTranslator title={"Upcoming"} language={languageCodeState} />
            </p>
            {upcoming!==undefined &&
                <HorizontalSlider
                    id={'upcoming'}
                    data={upcoming.results}
                    target="details-movie"    
                />
            }

            {/* 
            <p className='main-container__titles'>
                <TitlesTranslator title={"Discover"} language={languageCodeState} />
            </p>
            {discover!==undefined &&
                <HorizontalSlider
                    id={'discover'}
                    data={discover.results}
                    target="details-movie"    
                />
            } */}
        </div>
    )
}