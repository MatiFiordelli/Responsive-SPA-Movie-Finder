import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function FetchMovie(...props){
    const params = useParams()
    console.log(props[1])

    useEffect(()=>{
        let theUrl = `https://api.themoviedb.org/3/movie/${params.id}?api_key=4d1a073d6e646d93ce0400ffa3b8d13e&language=${params.lang}`
        axios.get(theUrl)
        .then((res) => {
            //setDataMovie(res.data)
        })

    },[])

    return null
}