import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from "../GlobalState/context.js"

export default function useLanguageSettings() {
    const { languageCodeState, setLanguageCodeState } = useContext(LanguageContext)
    const arrayFlags = [
                        { 'es-ES': '🇪🇸' },
                        { 'pt-BR': '🇧🇷' },
                        { 'en-US': '🇺🇸' }
    ]

    const currentIndex = arrayFlags.findIndex((e)=>{ 
        return(Object.keys(e).toString()===languageCodeState.split(',')[0]) 
    })
                                
    
    const [idxLanguage, setIdxLanguage] = useState(currentIndex)

    const toogleLanguage = () => {
        if (idxLanguage !== null) {
            idxLanguage >= arrayFlags.length - 1
                                                ? setIdxLanguage(0)
                                                : setIdxLanguage((i) => Number(i) + 1)
        }
    }

    useEffect(() => {
        setLanguageCodeState(Object.keys(arrayFlags[idxLanguage]).toString())

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [idxLanguage])

    useEffect(() => {
        if (languageCodeState !== null) {
            localStorage.setItem('lang', languageCodeState)
        }
    }, [languageCodeState])

    return [{
            languageFlagState: Object.values(arrayFlags[idxLanguage]), 
            languageCodeState: languageCodeState,
            toogleLanguage: toogleLanguage
    }]
}
