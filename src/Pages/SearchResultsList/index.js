import React, {useState, useEffect, useRef, useCallback, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { colorVoteAverage } from '../../Modules/usefulFunctions'
import { fetchData } from '../../Modules/FetchData/fetchData'
import { LanguageContext } from '../../GlobalState/context'
import SvgMovieNotFound from '../../Components/Svgs/SvgMovieNotFound'

export default function SearchResultsList() {
    const signal = axios.CancelToken.source()
	const navigate = useNavigate()
	const params = useParams()
    const { languageCodeState } = useContext(LanguageContext)
	const page = useRef(1)
	const [searchResultItem, setSearchResultItem] = useState([])
	const [data, setData] = useState()
	let searchPhrase = ''
	let paramsId = {}
	sessionStorage.setItem('isSearching', true)

	const setResultComponent = useCallback(() => {
		let url_path
		let info = []

		//Load array containing the list of results
		for(let i in data.results){
			url_path = (data.results[i].backdrop_path!==null)
				?`https://image.tmdb.org/t/p/w400/${data.results[i].backdrop_path}`
				:''

			info.push(
				(<div className="search-result-item" key={searchResultItem.length+i} onClick={()=>{}}>
					{url_path===""
								?<SvgMovieNotFound classNameProp='tv-movie-img-not-found-in-search'/>
								:<img 
									src={url_path} 
									className="search-result-item__poster" 
									title={data.results[i].title}
									alt={data.results[i].title}
								/>
					}
						
					<div 
						className="search-result-item__data" 
						onClick={()=>navigate(`/details-movie/1/${data.results[i].id}`)}
					>
						<div 
							className="search-result-item__data-title" 
							title={data.results[i].title}
						>
							{data.results[i].title}
						</div>
						<div className="search-result-item__data-date">{
								data.results[i].release_date!==undefined && data.results[i].release_date.slice(0,4)}
						</div>
						<div 
							className="search-result-item__data-average-vote" 
							style={{color:colorVoteAverage(data.results[i].vote_average)}}
						>
							{data.results[i].vote_average}
						</div>
					</div>
				</div>)
			)
		}
			
		page.current===1
			?setSearchResultItem([...info])
			:setSearchResultItem([...searchResultItem, ...info])

	},[data, navigate, searchResultItem])
	
 	useEffect(()=>{
		if(data !== undefined){
			if (data.page !== undefined && data.page <= data.total_pages){
				setResultComponent()			
			}
		}

		return ()=>{
            signal.cancel('Operation canceled by the user')
        }

		// eslint-disable-next-line react-hooks/exhaustive-deps 
	},[data])
		
	//Update the list of results at every search and at every language change
	 useEffect(()=>{
		setSearchResultItem([])
		page.current = 1
		if(params.terms!==undefined){
			searchPhrase = params.terms.replaceAll(' ', '+')
			paramsId = {page: page.current, searchPhrase: searchPhrase}
			fetchData(12, setData, signal, languageCodeState, paramsId)

			document.querySelector('.search-results').style.display = 'flex'
		}else{
			document.querySelector('.search-results').style.display = 'none'
		}
		
		return ()=>{
			signal.cancel('Operation canceled by the user')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps 
	},[params.terms, languageCodeState])

	useEffect(()=>{
		window.scrollTo(0, 0)

		return ()=>{
			window.onscroll = () => {}
			setSearchResultItem([])
			sessionStorage.setItem('isSearching', false)
		}
	},[])
	
	window.onscroll = function() {
		//Infinite scroll
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-5 ) {
			page.current += 1
			searchPhrase = params.terms.replaceAll(' ', '+')
			paramsId = {page: page.current, searchPhrase: searchPhrase}
			
			fetchData(12, setData, signal, languageCodeState, paramsId)
		}
	}

	return (
		<div className="search-results">
			{searchResultItem.map((e=>e))}
		</div>
	)
}