import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select/dist/declarations/src';

import { getLangs } from '../../apis/countryName';
import { translateWord, YA_DICT_API_KEY } from '../../apis/yaDict';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

const App = () => {
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentInputValue, setCurrentInputValue] = useState<string>('');

    const [langs, setLangs] = useState<Awaited<ReturnType<typeof getLangs> | null>>(null);
    let [fromLangs, setFromLangs] = useState<[string, string][] | null>(null);
    let [toLangs, setToLangs] = useState<[string, string][] | null>(null);

    const [fromLanguage, setFromLanguage] = useState<string>('');
    const [toLanguage, setToLanguage] = useState<string>('');

    useEffect(() => {
        getLangs()
            .then(res => setLangs(res))
    }, [])

    useEffect(() => {
        setFromLangs(null);
        if (langs) {
            for (let fromLangTuple of langs.keys()) {
                setFromLangs(fromLangs => {
                    if (fromLangs) {
                        return [...fromLangs, fromLangTuple]
                    }
                    return [fromLangTuple]
                })
            }
        }
    }, [langs])

    function handleChangeLangFrom(e: SingleValue<{ value: string; label: Element; }>){
        if (e && e.value) {
            setFromLanguage(e.value);
        }
    }
    function handleChangeLangTo(e: SingleValue<{ value: string; label: Element; }>){
        if (e && e.value) {
            setToLanguage(e.value);
        }
    }
    useEffect(() => {
        setToLangs(null);
        setToLanguage('');
        if (langs) {
            for (let fromLangTuple of langs.keys()) {
                if (fromLangTuple[0] === fromLanguage) {
                    const toLangsTuple = langs.get(fromLangTuple);

                    if (toLangsTuple) {
                        setToLangs(toLangsTuple);
                    }
                }
                else {
                    continue
                }
            }
        }
    }, [fromLanguage])

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
                <div className="flags__from">
                    {
                        fromLangs && 
                            <LanguageSelect availableLangArray={fromLangs} onChange={handleChangeLangFrom} placeholder='Choose first language'/>
                    }
                </div>
                <div className="flags__to">
                    {
                        toLangs && 
                            <LanguageSelect to={true} availableLangArray={toLangs} onChange={handleChangeLangTo} placeholder='Choose second language'/>
                    }
                </div>
            </div>
        </>
    );
}
 
export default App;