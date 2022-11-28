import React, {useState, useEffect, useRef, useCallback, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { colorVoteAverage } from '../../Modules/usefulFunctions.js'
import { fetchData } from '../../Modules/FetchData/fetchData.js'
import { LanguageContext } from '../../GlobalState/context.js'

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
								?<svg xmlns="http://www.w3.org/2000/svg" className="tv-movie-img-not-found" viewBox="0 0 32 32">
									<path fill="#b5b5b5" id="picture" d="M27.5,5H4.5A1.50008,1.50008,0,0,0,3,6.5v19A1.50008,1.50008,0,0,0,4.5,27h23A1.50008,1.50008,0,0,0,29,25.5V6.5A1.50008,1.50008,0,0,0,27.5,5ZM26,18.5l-4.79425-5.2301a.99383.99383,0,0,0-1.44428-.03137l-5.34741,5.34741L19.82812,24H17l-4.79291-4.793a1.00022,1.00022,0,0,0-1.41418,0L6,24V8H26Zm-17.9-6a2.4,2.4,0,1,1,2.4,2.4A2.40005,2.40005,0,0,1,8.1,12.5Z"/>
								</svg>
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