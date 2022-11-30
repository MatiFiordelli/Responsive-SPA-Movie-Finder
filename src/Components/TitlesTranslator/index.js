import React, { useEffect, useState } from 'react'

export default function TitlesTranslator({title, language, uppercase}) {
    const [returnedTitle, setReturnedTitle] = useState('Title not found')
    const positionLanguage = ['es-ES', 'pt-BR', 'en-US']
    let titlesList = 
    [   //Spanish, Portugues, English
        //Main
        ['En Tendencia Hoy', 'Em Alta Hoje', 'Trending Today'],
        ['En Cines', 'Nos Cinemas', 'In Theaters'],
        ['Populares', 'Populares', 'Popular'],
        ['Mejor Valoradas', 'Melhor Avaliados', 'Top Rated'],
        ['Próximamente', 'Em Breve', 'Upcoming'],
        ['Descubra', 'Descubra', 'Discover'],

        //Details Movies
        ['Sinopsis', 'Sinopse', 'Overview'],
        ['Elenco', 'Elenco', 'Cast'],
        ['Título Original', 'Título Original', 'Original Title'],
        ['Slogan', 'Slogan', 'Tagline'],
        ['Estado Actual', 'Estado Atual', 'Current Status'],
            ['Se Rumorea', 'Se Rumoreja', 'Rumored'],
            ['Planeada', 'Planejada', 'Planned'],
            ['En Producción', 'Em Produção', 'In Production'],
            ['En Posproducción', 'Em Pós-Produção', 'Post Production'],
            ['Estrenada', 'Lançado', 'Released'],
            ['Cancelada', 'Cancelado', 'Canceled'],

        ['Fecha de Lanzamiento', 'Data de Lançamento', 'Release Date'],
        ['Idioma Original', 'Lingua Original', 'Original Language'],
        ['Idiomas Hablados', 'Linguas Faladas', 'Spoken Languages'],
        ['Paises de Producción', 'Países de Produção', 'Production Countries'],
        ['Companias de Producción', 'Companhias de Produção', 'Production Companies'],
        ['Presupuesto', 'Orçamento', 'Budget'],
        ['Recaudación', 'Faturamento', 'Revenue'],
        ['Homepage', 'Homepage', 'Homepage'],
        ['Director', 'Diretor', 'Director'],
        ['Productor', 'Produtor', 'Producer'],
        ['Productor Ejecutivo', 'Produtor Executivo', 'Executive Producer'],
        ['Guión', 'Roteiro', 'Screenplay'],
        ['Equipo de Filmación', 'Equipe de Filmagem', 'Crew'],


        //Person profile
        ['Biografía', 'Biografia', 'Biography'],
        ['Fecha de Nacimiento', 'Data de Nascimento', 'Birthday'],
        ['Fecha de Defunción', 'Data da Morte', 'Deathday'],
        ['Lugar de Nacimiento', 'Naturalidade', 'Place of Birth'],
        ['Género', 'Gênero', 'Gender'],
        ['Trabajo', 'Trabalho', 'Job'],
        ['Homepage', 'Homepage', 'Homepage'],
        ['Conodido por', 'Conhecido por', 'Known For'],
        ['Femenino', 'Feminino', 'Female'],
        ['Masculino', 'Masculino', 'Male'],

        //BackdropImagesSlider.js
        ['Arrastre', 'Arraste', 'Drag'],
    ]

    const getLanguageArrayPosition = () => {
        return positionLanguage.findIndex((e)=>{
            return e === language
        })
    }

    const toPascalCase = () => {
        const titlePascalCase = []
        title
            .split(' ')
            .map((e)=>{
                //detect 2 letter word(must be lowercase otherwise PascalCase), and not at the begining of the sentence
                if(e.length > 2){
                    titlePascalCase.push(e[0].toUpperCase() + e.slice(1, e.length).toLowerCase())
                }else{
                    if(title.split(" ")[0].toLowerCase()=== e.toLowerCase()){
                        titlePascalCase.push(e) //fisrt letter of the first word (lenght: 2)
                    }else{
                        titlePascalCase.push(e.toLowerCase()) //fisrt letter of another word (lenght: 2)
                    }
                }
            })
        return titlePascalCase.toString().replaceAll(',',' ')
    }

    const getProperTitle = () => {
        return titlesList.map((e)=>{
            if(e.includes(toPascalCase(title))){
                setReturnedTitle(e[getLanguageArrayPosition()])
            }
        })
    }

    useEffect(()=>{
        getProperTitle()
    },[language])

    useEffect(()=>{
        return ()=>{
            titlesList=[]
        }
    },[])

    return(
        <>
            {uppercase
                ?returnedTitle.toUpperCase()
                :returnedTitle}
        </>
    )
}