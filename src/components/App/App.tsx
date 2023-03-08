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
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentInputValue, setCurrentInputValue] = useState<string>('');
    const [outCountries, setOutCountries] = useState<Awaited<ReturnType<typeof getCountries> | null>>(null);

    const [fromLanguage, setFromLanguage] = useState<string>('ru');
    const [toLanguage, setToLanguage] = useState<string>('en');

    useEffect(() => {
        getCountries()
            .then(res => setOutCountries(res))
    }, [])

    async function handleSend(currentWord: string, currentInputValue: string, fromLanguage: string, toLanguage: string): Promise<void> {
        if (currentWord !== currentInputValue) {
            const response = await translateWord({key: YA_DICT_API_KEY, lang: `${fromLanguage}-${toLanguage}`, text: currentInputValue});

            if (response.def.length) {
                setCurrentWord(response.def[0].tr[0].text || ''); //здесь надо будет выводить ВСЕ результаты и показывать их fr показатель графически
            }
        }
    }

    return ( 
        <>
            <input type="text" value={currentInputValue} onChange={(e) => setCurrentInputValue(e.target.value)}/>
            <button 
                onClick={() => {handleSend(currentWord, currentInputValue, fromLanguage, toLanguage)}}>
                    Отправить
            </button>

            <div className="result">
                {currentWord}
            </div>
            <div className="flags">
                {outCountries && outCountries.map(country => {
                    //Изменить некорректное соотношение между названием языка и страны-родителя
                    if (country[0] in fixBadLangBinary) {
                        country[0] = fixBadLangBinary[country[0]]
                    }
                    if (country[1] in fixBadLangBinary) {
                        country[1] = fixBadLangBinary[country[1]]
                    }
                    // Убрать все коды, в которых более 3ех символов
                    if (country[0].length > 2) {
                        return null
                    }

                    return (
                        <div>
                            <span className={`fi fi-${country[0]}`}></span>
                            {country[1]}
                        </div>
                    )
                })}
            </div>
        </>
    );
}
 
export default App;