import { useEffect, useState } from 'react';
import { getCountries } from '../../apis/countryName';
import { translateWord, YA_DICT_API_KEY } from '../../apis/yaDict';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

const fixBadLangBinary: {[key: string]: string} = {
    be: 'by',
    cs: 'cz',
    da: 'dk',
    el: 'gr',
    en: 'gb',
    et: 'ee',
    sv: 'se',
    uk: 'ua',
    zh: 'cn'
}

const App = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [currentInputValue, setCurrentInputValue] = useState('');
    const [outCountries, setOutCountries] = useState<any[] | null>(null);

    useEffect(() => {
        getCountries()
            .then(res => setOutCountries(res))
    }, [])

    async function handleSend() {
        if (currentWord !== currentInputValue) {
            const response = await translateWord({key: YA_DICT_API_KEY, lang: 'ru-en', text: currentInputValue});
            setCurrentWord(response?.def[0].tr[0].text || '')
         }
    }

    return ( 
        <>
            <input type="text" value={currentInputValue} onChange={(e) => setCurrentInputValue(e.target.value)}/>
            <button onClick={handleSend}>Отправить</button>

            <div className="result">
                {currentWord}
            </div>
            <div className="flags">
                {outCountries && outCountries.map(country => {
                    if (country[0] in fixBadLangBinary) {
                        country[0] = fixBadLangBinary[country[0]]
                    }
                    if (country[0].length > 2) {
                        return null
                    }

                    return <div>
                            <span className={`fi fi-${country[0]}`}></span>
                            {country[1]}
                        </div>
                })}
            </div>
        </>
    );
}
 
export default App;