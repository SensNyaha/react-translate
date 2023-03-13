import Select from 'react-select';
import { SingleValue } from 'react-select/dist/declarations/src';

import { langCodeToISO } from '../../helpers/langCodeToISO';

import './LanguageSelect.scss';

interface LanguageSelectProps {
    onChange: (e: SingleValue<{ value: string; label: Element; }>) => void;
    availableLangArray: [string, string][] | null;
    placeholder: string,
    currentLang: string,
    to?: boolean,
}

function langArrayToOptionObj (availableLangArray: LanguageSelectProps['availableLangArray']) {
    return availableLangArray?.map(lang => {
                const langCopy = [...lang];

                langCopy[0] = langCodeToISO(langCopy[0]);

                const result: { value: string; label: Element; } = { 
                    value: lang[0], 
                    label: (
                        <div className='lang-select__item' cdata-lang={lang[0]} data-lang-type='from'>
                            <span className={`fi fi-${langCopy[0]}`}></span>
                            {langCopy[1].toUpperCase()}
                        </div>
                    ) as unknown as Element
                }

                return result
            })
}

function getLangObj (shortLangName: string, langObjArray: ReturnType<typeof langArrayToOptionObj>) {
    return langObjArray?.find(l => l.value === shortLangName);
}

const LanguageSelect = ({onChange, availableLangArray, placeholder, currentLang, to } : LanguageSelectProps) => {
    return (                         
        <Select 
            onChange={onChange}
            placeholder={placeholder}
            options={langArrayToOptionObj(availableLangArray)}
            value = {getLangObj(currentLang, langArrayToOptionObj(availableLangArray))}
        />
     );
}
 
export default LanguageSelect;