import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select';

import { langCodeToISO } from '../../helpers/langCodeToISO';
import { store } from '../../store';
import { chooseFromLanguage, setToLanguage } from '../../store/actions/appActions';
import { IAppReducer } from '../../store/reducers/appReducer';

import './LanguageSelect.scss';

interface LanguageSelectProps {
    placeholder?: string;
    type?: string
}

function langObjToOptionObj (langs: [string, string][] | null) {
    return langs?.map(lang => {
        const langCopy = [...lang];
        langCopy[0] = langCodeToISO(langCopy[0]);

        const result: { value: string; label: Element; } = { 
            value: lang[0], 
            label: (
                <div className='lang-select__item' data-lang={lang[0]} data-lang-type='from'>
                    <span className={`fi fi-${langCopy[0]}`}></span>
                    {langCopy[1].toUpperCase()}
                </div>
            ) as unknown as Element
        }

        return result
    })
}

function getLangObj (shortLangName: string, langObjArray: ReturnType<typeof langObjToOptionObj>) {
    return langObjArray?.find(l => l.value === shortLangName);
}

function handleChangeLangFrom(e: SingleValue<{ value: string; label: Element; }>, dispatch: typeof store.dispatch | Dispatch<any>){
    if (e && e.value) {
        return dispatch(chooseFromLanguage(e.value));
    }
}
function handleChangeLangTo(e: SingleValue<{ value: string; label: Element; }>, dispatch: typeof store.dispatch | Dispatch<any>){
    if (e && e.value) {
        return dispatch(setToLanguage(e.value));
    }
}

const LanguageSelect = ({placeholder, type} : LanguageSelectProps) => {
    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    const currentLanguage = type === 'from' ? state.fromLanguage : state.toLanguage;
    const currentLangOptionsObj = type === 'from' ? langObjToOptionObj(state.fromLangs) : langObjToOptionObj(state.toLangs);

    const onChange = type === 'from' ? (e: SingleValue<{ value: string; label: Element; }>) => {handleChangeLangFrom(e, dispatchAsync)} : (e: SingleValue<{ value: string; label: Element; }>) => {handleChangeLangTo(e, dispatch)};

    return (                         
        <Select 
            onChange={onChange}
            placeholder={placeholder || undefined}
            options={currentLangOptionsObj}
            value = {getLangObj(currentLanguage, currentLangOptionsObj)}
            isSearchable={false}
        />
     );
}
 
export default LanguageSelect;