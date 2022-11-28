import axios from "axios"

export const fetchData = (urlId, setState, signal, languageCodeState, paramsId) => {
    const apiKey = '4d1a073d6e646d93ce0400ffa3b8d13e'
    const endPointBg = 'https://api.themoviedb.org/3'
    const urlArray = [
        //Main.js 0 to 6
        `${endPointBg}/movie/latest?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,
        `${endPointBg}/movie/now_playing?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=AR`,
        `${endPointBg}/movie/popular?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=BR`,
        `${endPointBg}/movie/top_rated?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=US`,
        `${endPointBg}/movie/upcoming?api_key=${apiKey}&language=${languageCodeState}&page=1&include_adult=false&region=US`,
        `${endPointBg}/discover/movie?api_key=${apiKey}&language=${languageCodeState}&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&region=US`,
        `${endPointBg}/trending/movie/day?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,

        //DetaisMovie.js 7 to 9
        `${endPointBg}/movie/${paramsId}?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,
        `${endPointBg}/movie/${paramsId}/credits?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,
        `${endPointBg}/movie/${paramsId}/images?api_key=${apiKey}`, //this endpoint does not return data if I use &language

        //PersonProfile.js 10 to 11
        `${endPointBg}/person/${paramsId}?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,
        `${endPointBg}/person/${paramsId}/movie_credits?api_key=${apiKey}&language=${languageCodeState}&include_adult=false`,

        //SearchResultsList.js 12   (in this case, paramsId is an object with page number and search phrase)
        `${endPointBg}/search/movie?api_key=${apiKey}&language=${languageCodeState}&page=${paramsId!==null && paramsId.page}&query=${paramsId!==null && paramsId.searchPhrase}&include_adult=false`,
    ]

    axios.get(urlArray[urlId], {cancelToken: signal.token})
    .then((res)=>{
        setState(res.data)
    })
    .catch((e)=>{
        if(axios.isCancel(e)){
            console.log(e.message)
        }else{
            console.log('Error: ' + e)
        }
    })
}