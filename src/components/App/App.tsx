import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select/dist/declarations/src';

import { getLangs } from '../../apis/countryName';
import { translateWord, YA_DICT_API_KEY } from '../../apis/yaDict';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';
import LanguageSelect from '../LanguageSelect/LanguageSelect';


import { setCurrentWord } from '../../store/actions/appActions';
import {useDispatch, useSelector} from 'react-redux';

const App = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);


    const [currentWord, setCurrentWord1] = useState<string>('');
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
    useEffect(() => {
        if (toLangs && toLangs.length) {
            if (toLangs.findIndex(l => l[0][0] === 'ru') && fromLanguage !== 'ru') {
                setToLanguage('ru')
            }
            else {
                setToLanguage(toLangs[0][0])
            }
        }
    }, [toLangs])

    function handleSend(currentWord: string, currentInputValue: string, fromLanguage: string, toLanguage: string): void {
        // if (currentWord !== currentInputValue) {
        //     const response = await translateWord({key: YA_DICT_API_KEY, lang: `${fromLanguage}-${toLanguage}`, text: currentInputValue});

        //     if (response.def.length) {
        //         setCurrentWord(response.def[0].tr[0].text || ''); //здесь надо будет выводить ВСЕ результаты и показывать их fr показатель графически
        //     }
        // }

        dispatch(setCurrentWord(currentInputValue))
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
            <div className="select">
                <div className="select__from">
                    {
                        fromLangs && 
                            <LanguageSelect 
                                currentLang={fromLanguage}
                                availableLangArray={fromLangs} 
                                onChange={handleChangeLangFrom} 
                                placeholder='Choose first language'
                            />
                    }
                </div>
                <div className="select__to">
                    {
                        toLangs && 
                            <LanguageSelect 
                                currentLang={toLanguage}
                                to={true} 
                                availableLangArray={toLangs} 
                                onChange={handleChangeLangTo} 
                                placeholder='Choose second language'
                            />
                    }
                </div>
            </div>
        </>
    );
}
 
export default App;