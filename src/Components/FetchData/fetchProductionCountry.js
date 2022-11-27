import axios from 'axios'

export function fetchProductionCountry(setProductionCountry){
    const url = 'https://api.themoviedb.org/3/configuration/countries?api_key=4d1a073d6e646d93ce0400ffa3b8d13e'
    axios.get(url)
    .then((res)=>{
        if(res.data !== undefined){
            setProductionCountry(res.data)
        }
    })
}