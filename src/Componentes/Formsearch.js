import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Formsearch() {
	const [search, setSearch] = useState('')
	var page = 1
	var bPosterCont = document.getElementById('bigPosterContainer')
	var formSearch = document.getElementById('form')
	var prevScrollPos = window.pageYOffset
	
	
	function Main(){	
		let url_foto, info, i, row, cell1, cell2
		let table = document.getElementById("content");
		let searchPrase = search.replaceAll(" ", "+")
		let theUrl = "https://api.themoviedb.org/3/search/movie?api_key=4d1a073d6e646d93ce0400ffa3b8d13e&language=en-US&page=" + page + "&query=" + searchPrase + "&include_adult=false"
		let arrayPosters = document.getElementsByClassName('posterM') 
		
		axios.get(theUrl)
		.then((res) => {
			let datos = res.data
			if (datos.page !== undefined){
				loadTable()
			}
			
			function loadTable() { 
				
				for (i=0; i<20; i++){
					url_foto =`https://image.tmdb.org/t/p/w200/${datos.results[i].poster_path}`
					
					info = `<div class="titleM"> ${datos.results[i].original_title} </div>
						<div class="overviewM"> ${datos.results[i].overview} </div>
						<div class="dateM"> ${datos.results[i].release_date} </div>
						<div class="averageM"> ${datos.results[i].vote_average} </div>`
					
					row = table.insertRow(-1)
					cell1 = row.insertCell(0)
					cell2 = row.insertCell(1)
					cell1.innerHTML = `<img src="${url_foto}" class="posterM" title="Click to enlarge" alt="Image not Found"/>`
					cell2.innerHTML = info
					cell2.className = 'infoCell'
				}
			}

			//Displays the bigPoster image
			for (i=0; i<Object.keys(arrayPosters).length; i++) {
				arrayPosters[i].addEventListener('click', (e) => {
					bPosterCont.style.visibility = 'visible';
					let bigPoster = e.target.getAttribute('src').replace('w200', 'w500')
					bPosterCont.innerHTML = `<img src="${bigPoster}" id="bigPoster" title="Click to Close" alt="Image not Found"/>`
				}) 
			}
	
		})
		
		
	}


	useEffect(()=>{
		if (search !== "" && page === 1){
			Main()
			//Big Poster disappears on click
			bPosterCont.addEventListener('click', ()=>{
				bPosterCont.style.visibility='hidden'
			})
		}
	})
	
	
	//Initialize the page displaying the results of 'avengers'
	window.onload = function() {
		changeState('avengers') 
		document.body.style.opacity = '1' 
		document.body.style.transition = 'opacity 2000ms'
	}
	
	
	//Hide the Search Bar on scroll
	function hideSearchBar() {
		let currentScrollPos = window.pageYOffset

		//Controls if the scrollY is up or down
		if (prevScrollPos > currentScrollPos) {
			formSearch.style.top = '0'
		}else {
			formSearch.style.top = '-30px'
		}
		prevScrollPos = currentScrollPos
	}
	
	
	window.onscroll = function() {
		//Hide Search Bar on scroll
		hideSearchBar()
		
		document.getElementById('search').blur()
		
		//Every time the scroll reaches the bottom of page it loads more results
		if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
			page += 1
			Main()
		}
	}
	
	
	//Every time the input element changes, it deletes all the results in the table to display the newer ones, starting at page 1
	function changeState(state) {
		setSearch(state)
		while (document.getElementById('content').rows.length > 0) {
			document.getElementById('content').deleteRow(-1) 
		};
		page = 1
	}



	return (
		<>
			<div id="bigPosterContainer" />
			<div id="form">
				<input type="text" id="search" value={search} onChange={(e)=> changeState(e.target.value)} placeholder="Write here the name of a Movie" autoFocus/>
				<input type="button" className="btn" id="btnTopScroll" value="TOP" onClick={()=>window.scrollTo(0,0)} /> 
			</div>

			<table id="content"/>
		</>
	)
}