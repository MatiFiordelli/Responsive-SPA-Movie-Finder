import React, { useState, Fragment, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HorizontalSlider from '../../Components/Slider/HorizontalSlider'
import EnlargeImage from '../../Components/EnlargeImage'
import {colorVoteAverage, 
        setComma, 
        setLocaleCurrency, 
        asideVerticalMovement,
        getCrewMembers,
        getOriginalLanguage,
        getProductionCountry } from '../../Modules/usefulFunctions.js'
import { fetchData } from '../../Modules/FetchData/fetchData.js'
import { fetchOriginalLanguage } from '../../Modules/FetchData/fetchOriginalLanguage.js'
import { fetchProductionCountry } from '../../Modules/FetchData/fetchProductionCountry'
import BackdropImagesSlider from '../../Components/Slider/BackdropImagesSlider'
import ImageLoader from '../../Components/ImageLoader'
import StackSlider from '../../Components/Slider/StackSlider'
import { LanguageContext } from '../../GlobalState/context.js'
import TitlesTranslator from '../../Components/TitlesTranslator'

export default function DetailsMovie() {
    const signal = axios.CancelToken.source()
    const [dataMovie, setDataMovie] = useState()
    const [dataMovieCredits, setDataMovieCredits] = useState()
    const [dataImagesPerMovie, setDataImagesPerMovie] = useState()
    const [originalLanguageList, setOriginalLanguageList] = useState()
    const [productionCountryList, setProductionCountryList] = useState()
    const [enlargedImageOrigin, setEnlargedImageOrigin] = useState()
    const [enlargedImageVisibility, setEnlargedImageVisibility] = useState('none')
   // const [stackSliderVisibility, setStackSliderVisibility] = useState('none')
    const params = useParams()
    const { languageCodeState, setLanguageCodeState } = useContext(LanguageContext)
    const urlImg = "https://image.tmdb.org/t/p/w1280/"
    const optionsDate = {
                        year:'numeric',
                        month:'long',
                        day:'2-digit'
                        }

    const contentUseEffect = () => {
        //urlId, setState, signal, languageCodeState, paramsId(movieID or personID)
        fetchData(7, setDataMovie, signal, languageCodeState, params.id)
        fetchData(8, setDataMovieCredits, signal, languageCodeState, params.id)
        fetchData(9, setDataImagesPerMovie, signal, languageCodeState, params.id)
        
        fetchOriginalLanguage(setOriginalLanguageList)
        fetchProductionCountry(setProductionCountryList)
    }
    
    useEffect(()=>{
        window.scrollTo(0, 0)

        contentUseEffect()

        return ()=>{
            signal.cancel('Operation canceled by the user')
            window.onscroll = () => {}

            //to avoid a setState on an unmonted component
            setDataMovieCredits({})
            setDataImagesPerMovie({})
            setOriginalLanguageList({})
            setProductionCountryList({})
            setEnlargedImageOrigin({})
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])

    useEffect(()=>{
        contentUseEffect()

        return ()=>{
            signal.cancel('Operation canceled by the user')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[languageCodeState])

    //Makes sticky the Sidebar on scroll 
    const [sidebarInitialY, setSideBarInitialY] = useState()
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY)
    const stickySidebar = useRef()
    window.onscroll = () => {
        asideVerticalMovement(
                            stickySidebar.current, 
                            prevScrollY, 
                            setPrevScrollY, 
                            sidebarInitialY, 
                            setSideBarInitialY)
    }

/*     const loadingImage = (url) => {

        return new Promise(()=>{
            const img = new Image()
            img.onload = () => {
                resolvePath(img)
            }
            img.src=url
        })
    } */

    return(
        <>
        {dataMovie!==undefined && dataMovieCredits!==undefined &&
        <div className="profile">
            {/* <StackSlider 
                        imagesPerMovie={dataImagesPerMovie}
                        stackSliderVisibility={stackSliderVisibility}
                        setStackSliderVisibility={setStackSliderVisibility}
                        urlImg={urlImg}
            /> */}
            <EnlargeImage  //for the poster
                        image={enlargedImageOrigin}
                        enlargedImageVisibility={enlargedImageVisibility}
                        setEnlargedImageVisibility={setEnlargedImageVisibility} />
        
            <section className="top-container">
                {dataMovie.backdrop_path!==null
                    ?<BackdropImagesSlider 
                                            imagesData={dataImagesPerMovie} 
                                            parallax={true} 
                                            origin="movie"
                                            title={dataMovie.title} 
                    />
                    :<div className="backdrop-image" />
                }
                <div 
                    className="average-vote-details" 
                    style={{backgroundColor:`${colorVoteAverage(dataMovie.vote_average)}`}}
                >
                    {Math.round(dataMovie.vote_average*10)/10 /* rounding decimals */} 
                </div>

                <div className="summary-bar">
                    {dataMovie.title!=='' &&
                        <h1 className="title">{dataMovie.title}</h1>
                    }

                    <div className="subtitle">
                        {dataMovie.release_date!=='' &&
                            <div className="year">{dataMovie.release_date.slice(0,4)}</div>
                        }

                        {dataMovie.runtime!==0 &&
                        <>
                            <span>&nbsp;•&nbsp;</span>
                            <span className="runtime">{dataMovie.runtime} mins</span>
                        </>
                        }

                        {dataMovie.genres.length!==0 &&
                        <>
                            <span>&nbsp;•&nbsp;</span>
                            <span className="genres">{dataMovie.genres.map((e,i,a)=>(
                                                                <Fragment key={i}>
                                                                    {e.name}{(i===a.length-1)?" ":", "} 
                                                                </Fragment>
                                                                ))}</span>
                        </>
                        }
                    </div>                        
                </div>
            </section>
            
            {dataMovie.poster_path!==null &&
            <aside className="sticky-sidebar" 
                ref={stickySidebar}
            >
                <ImageLoader 
                    src={`${urlImg}${dataMovie.poster_path}`}
                    alt={dataMovie.original_title}
                    title={dataMovie.original_title}
                    className="poster-path" 
                    /* onClick={()=>stackSliderVisibility==='flex'
                                    ?setStackSliderVisibility('none')
                                    :setStackSliderVisibility('flex')} */
                    onClick={()=>enlargedImageVisibility==='flex'
                                    ?setEnlargedImageVisibility('none')
                                    :setEnlargedImageVisibility('flex')}
                                    
                    onMouseDown={()=>setEnlargedImageOrigin(`${urlImg}${dataMovie.poster_path}`)}
                />

                <div className="sticky-sidebar-menu">
                    {dataMovie.overview!=='' &&
                    <p>
                        <a onClick={()=>{document.querySelector('#overview').scrollIntoView()}}>
                            <TitlesTranslator title={"OVERVIEW"} language={languageCodeState} uppercase />
                        </a>
                    </p>}
                    {dataMovieCredits.cast.length!==0 && dataMovieCredits.cast !== undefined &&
                    <p>
                        <a onClick={()=>{document.querySelector('#cast').scrollIntoView()}}>
                            <TitlesTranslator title={"CAST"} language={languageCodeState} uppercase />
                        </a>
                    </p>}
                    {dataMovieCredits.crew.length!==0 &&
                    <p>
                        <a onClick={()=>{document.querySelector('#crew').scrollIntoView()}}>
                            <TitlesTranslator title={"CREW"} language={languageCodeState} uppercase/>
                        </a>
                    </p>}
                </div>
            
            </aside>}

            <section className="data-container">
                <article className="details">
                    <dl>
                        {dataMovie.overview!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <a id="overview">
                                            <TitlesTranslator title={"Overview"} language={languageCodeState} />:
                                        </a>
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.overview}</dd>
                        </>
                        }
                    </dl>
                    
                    {dataMovieCredits.cast.length!==0 &&
                        <a id="cast">
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Cast"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <HorizontalSlider 
                                id={"cast"} 
                                data={dataMovieCredits.cast} 
                                target="person-profile"
                            />
                        </a>                    
                    }
                        
                    <dl>
                        {dataMovie.original_title!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Original title"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.original_title}</dd>
                        </>}

                        {dataMovie.tagline!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Tagline"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.tagline}</dd>
                        </>}

                        {dataMovie.status!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Current status"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <dd>
                                <TitlesTranslator title={dataMovie.status} language={languageCodeState} />
                            </dd>
                        </>}

                        {dataMovie.release_date!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Release date"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{new Date(dataMovie.release_date).toLocaleDateString(languageCodeState==='undefined'?'en-US':`${languageCodeState}`, optionsDate)}</dd>
                        </>}

                        {dataMovie.original_language!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Original language"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{getOriginalLanguage(dataMovie.original_language, originalLanguageList)}</dd>
                        </>}

                        {dataMovie.spoken_languages.length!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Spoken languages"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.spoken_languages.map((e,i,array)=>
                                                                            <Fragment key={i}>
                                                                                {e.english_name}{setComma(i, array)}<br/>
                                                                            </Fragment>)}</dd>
                        </>}

                        {dataMovie.production_countries.length!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Production countries"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.production_countries.map((e,i,array)=>
                                                                                <Fragment key={i}>
                                                                                    {getProductionCountry(e.iso_3166_1, productionCountryList)}{setComma(i, array)}<br/>
                                                                                </Fragment>)}</dd>
                        </>}

                        {dataMovie.production_companies.length!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Production companies"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataMovie.production_companies.map((e,i,array)=>
                                                                        <Fragment key={i}>
                                                                            {e.name}{setComma(i, array)}<br/>
                                                                        </Fragment>)}</dd>
                        </>}
                        
                        {dataMovie.budget!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Budget"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>${setLocaleCurrency(dataMovie.budget, languageCodeState)}</dd>
                        </>}
                        
                        {dataMovie.revenue!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Revenue"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>${setLocaleCurrency(dataMovie.revenue, languageCodeState)}</dd>
                        </>}
                        
                        {dataMovie.homepage!=='' &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Homepage"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd><a 
                                    href={dataMovie.homepage} 
                                    target="_blank" 
                                    rel="noreferrer">{dataMovie.homepage}
                                </a>
                            </dd>
                        </>}


                        {getCrewMembers(dataMovieCredits, "Director").length > 0 &&
                            <>
                                <dt>
                                    <em>
                                        <strong>
                                            <TitlesTranslator title={"Director"} language={languageCodeState} />:
                                        </strong>
                                    </em>
                                </dt>
                                <dd>{getCrewMembers(dataMovieCredits, "Director")}</dd>
                            </>
                        }

                        {getCrewMembers(dataMovieCredits, "Producer").length > 0 &&
                            <>
                                <dt>
                                    <em>
                                        <strong>
                                            <TitlesTranslator title={"Producer"} language={languageCodeState} />:
                                        </strong>
                                    </em>
                                </dt>
                                <dd>{getCrewMembers(dataMovieCredits, "Producer")}</dd>
                            </>
                        }
                            
                        {getCrewMembers(dataMovieCredits, "Executive Producer").length > 0 &&
                            <>
                                <dt>
                                    <em>
                                        <strong>
                                            <TitlesTranslator title={"Executive producer"} language={languageCodeState} />:
                                        </strong>
                                    </em>
                                </dt>
                                <dd>{getCrewMembers(dataMovieCredits, "Executive Producer")}</dd>
                            </>
                        }
                            
                        {getCrewMembers(dataMovieCredits, "Screenplay").length > 0 &&
                            <>
                                <dt>
                                    <em>
                                        <strong>
                                            <TitlesTranslator title={"Screenplay"} language={languageCodeState} />:
                                        </strong>
                                    </em>
                                </dt>
                                <dd>{getCrewMembers(dataMovieCredits, "Screenplay")}</dd>
                            </>
                        }
                    </dl>

                    {dataMovieCredits.crew.length!==0 &&
                        <a id="crew">
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Crew"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <HorizontalSlider 
                                id={"crew"} 
                                data={dataMovieCredits.crew} 
                                target={"person-profile"}
                            />
                        </a>
                    }
                </article>
            </section> 
        </div>
        }        
        </>
    )
}