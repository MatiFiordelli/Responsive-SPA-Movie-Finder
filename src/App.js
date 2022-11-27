import React, { useState } from 'react';
import Routess from './Components/Router/Routess'
import Layout from './Layout'
import { LanguageContext } from "./GlobalState/context.js"

export default function App() {
	const initialLanguage = localStorage.getItem('lang') === null
																?'en-US'
																:localStorage.getItem('lang')
	const [languageCodeState, setLanguageCodeState] = useState(initialLanguage)

	return (
		<LanguageContext.Provider value={{languageCodeState, setLanguageCodeState}}>
			<Layout>
				<Routess />
			</Layout>
		</LanguageContext.Provider>
	);
}


