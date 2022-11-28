import React, { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {asideVerticalMovement, 
        calcAge } from '../../Modules/usefulFunctions.js'
import { fetchData } from '../../Modules/FetchData/fetchData.js'
import HorizontalSlider from '../../Components/Slider/HorizontalSlider'
import EnlargeImage from '../../Components/EnlargeImage'
import BackdropImagesSlider from '../../Components/Slider/BackdropImagesSlider'
import ImageLoader from '../../Components/ImageLoader'
import { LanguageContext } from '../../GlobalState/context.js'
import TitlesTranslator from '../../Components/TitlesTranslator/index.js'

export default function PersonProfile(){
    const signal = axios.CancelToken.source()
    const { languageCodeState } = useContext(LanguageContext)
    const params = useParams()
    const [dataPerson, setDataPerson] = useState()
    const [dataMoviePerPerson, setDataMoviePerPerson] = useState()
    const [age, setAge] = useState()
    const [enlargedImageOrigin, setEnlargedImageOrigin] = useState()
    const [enlargedImageVisibility, setEnlargedImageVisibility] = useState('none')
    const urlImg = "https://image.tmdb.org/t/p/w1280/"

    const optionsDate = {
                        year:'numeric',
                        month:'long',
                        day:'2-digit'
                        }

    useEffect(()=>{
        //urlId, setState, signal, languageCodeState, paramsId(movieID or personID)
        fetchData(10, setDataPerson, signal, languageCodeState, params.id)

        return ()=> {
            signal.cancel('Operation canceled by the user')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[languageCodeState])

    useEffect(()=>{
        if(dataPerson !== undefined){
            calcAge(dataPerson.birthday, dataPerson.deathday, setAge)
            fetchData(11, setDataMoviePerPerson, signal, languageCodeState, params.id)
        }

        return ()=>{
            signal.cancel('Operation canceled by the user')
        }

    },[dataPerson])

    useEffect(()=>{
        dataPerson === undefined && fetchData(10, setDataPerson, signal, languageCodeState, params.id)

        return ()=> {
            signal.cancel('Operation canceled by the user')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])

    //Makes sidebar sticky on scroll
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

    return(
        <>
        {dataPerson!==undefined && 
        <div className="profile">
            <EnlargeImage 
                        image={enlargedImageOrigin}
                        enlargedImageVisibility={enlargedImageVisibility}
                        setEnlargedImageVisibility={setEnlargedImageVisibility}/>

            <section className="top-container">
            
                {dataMoviePerPerson !== undefined
                    ?<BackdropImagesSlider 
                                        imagesData={dataMoviePerPerson} 
                                        parallax={true} 
                                        origin={params.persongroup}
                    />
                    :<div className="backdrop-image" />
                }

                <div className="summary-bar">
                    <h1 className="title">{dataPerson.name!==null && dataPerson.name}</h1>
                </div>
            </section>
            
            {dataMoviePerPerson!==undefined && dataPerson.profile_path!==null &&
            <aside className="sticky-sidebar" 
                ref={stickySidebar}
            > 
                <ImageLoader 
                    src={`${urlImg}${dataPerson.profile_path}`}
                    alt={dataPerson.name}
                    title={dataPerson.name}
                    className="poster-path"
                    onClick={()=>enlargedImageVisibility==='flex'
                            ?setEnlargedImageVisibility('none')
                            :setEnlargedImageVisibility('flex')}
                    onMouseDown={()=>setEnlargedImageOrigin(`${urlImg}${dataPerson.profile_path}`)}
                />
                
                <div className="sticky-sidebar-menu">
                    {dataPerson.biography!=="" && 
                        <p>
                            <a onClick={()=>{document.querySelector('#biography').scrollIntoView()}}>
                                <TitlesTranslator title={"Biography"} language={languageCodeState} uppercase />
                            </a>
                        </p>
                    }
                    {dataMoviePerPerson.cast.length!==0 &&
                        <p>
                            <a onClick={()=>{document.querySelector('#knownfor').scrollIntoView()}}>
                                <TitlesTranslator title={"Known for"} language={languageCodeState} uppercase />
                            </a>
                        </p>
                    }
                </div>
            </aside>
            }

            <section className="data-container">
                <article className="details">
                    {dataPerson!==undefined &&
                    <>
                    <dl>
                        {dataPerson.biography!=="" && 
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <a id="biography">
                                            <TitlesTranslator title={"Biography"} language={languageCodeState} />:
                                        </a>
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataPerson.biography}</dd>
                        </>}
                    </dl>

                    <dl>
                        {dataPerson.birthday!==null &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Birthday"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{new Date(dataPerson.birthday).toLocaleDateString(languageCodeState==='undefined'?'en-US':languageCodeState, optionsDate)}<span> {age}</span></dd>
                        </>}

                        {dataPerson.deathday!==null &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Deathday"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <dd>{new Date(dataPerson.deathday).toLocaleDateString(languageCodeState==='undefined'?'en-US':`${languageCodeState}`, optionsDate)}</dd>
                        </>}
                        
                        {dataPerson.place_of_birth!==null && 
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Place of birth"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataPerson.place_of_birth}</dd>
                        </>}
                        
                        {dataPerson.gender!==0 && 
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Gender"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <dd>
                                {dataPerson.gender===1
                                                        ?<TitlesTranslator title={"Female"} language={languageCodeState} />
                                                        :<TitlesTranslator title={"Male"} language={languageCodeState} />
                                }
                            </dd>
                        </>}

                        {dataPerson.known_for_department!==null && 
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Job"} language={languageCodeState} />:
                                    </strong>
                                </em>
                            </dt>
                            <dd>{dataPerson.known_for_department}</dd>
                        </>}
                        
                        {dataPerson.homepage!==null && 
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <TitlesTranslator title={"Homepage"} language={languageCodeState} />: 
                                    </strong>
                                </em>
                            </dt>
                            <dd>{<a href={dataPerson.homepage} 
                                    target="_blank" 
                                    rel="noreferrer">{dataPerson.homepage}
                                </a>}</dd>
                        </>}
                    </dl>
                    </>
                    }
                    {dataMoviePerPerson!==undefined &&
                    <>
                        {dataMoviePerPerson.cast.length!==0 &&
                        <>
                            <dt>
                                <em>
                                    <strong>
                                        <a id="knownfor">
                                            <TitlesTranslator title={"Known for"} language={languageCodeState} />:
                                        </a>
                                    </strong>
                                </em>
                            </dt>
                            <HorizontalSlider 
                                id={'1'} 
                                data={params.persongroup==='cast'
                                        ?dataMoviePerPerson.cast
                                        :dataMoviePerPerson.crew}
                                target="details-movie"
                            />
                        </>}
                    </>}
                </article>
            </section>
        </div>
        }
        </>
    )
}