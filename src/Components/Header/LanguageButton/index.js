import React from 'react'
import useLanguageSettings from '../../../CustomHooks/useLanguageSettings'

export default function LanguageButton(){
    const [{languageFlagState, toogleLanguage}] = useLanguageSettings()
    
    return(
        <div className="language-button-container">
            <span 
                className="language-button-container__button"
                onClick={()=>{toogleLanguage()}}
            >
                {languageFlagState}
            </span>
        </div>
    )
}