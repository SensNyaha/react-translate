import { Dispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { loadLanguages, swapLanguages } from "../../store/actions/appActions";
import { IAppReducer } from "../../store/reducers/appReducer";

import LanguageSelect from "../LanguageSelect/LanguageSelect";

import arrows from './arrows.png';

const LanguagesSwitchers = () => {
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    useEffect(() => {
        dispatchAsync(loadLanguages())
    }, [])

    return ( 
        <div className="lang-select">
                {
                    state.fromLangs?.length && 
                        <LanguageSelect 
                            type='from'
                            placeholder={'Choose first language'.toUpperCase()}
                        />
                }
                {
                    <img 
                        style={
                            {
                                opacity: state.toLanguage && state.fromLanguage ? '1' : '0', 
                                cursor: state.toLanguage && state.fromLanguage ? 'pointer' : 'default',
                                pointerEvents: state.toLanguage && state.fromLanguage ? 'all' : 'none'
                            }
                        }
                        src={arrows} 
                        alt="arrow" 
                        className='lang-select__arrow'
                        onClick={() => dispatchAsync(swapLanguages())}
                    />
                }
                {
                    state.toLangs?.length 
                    ?   <LanguageSelect 
                            type='to' 
                            placeholder={'Choose second language'.toUpperCase()}
                        /> 
                    : state.fromLangs?.length 
                    ?   <LanguageSelect 
                            hidden={true}
                            placeholder={'Choose second language'.toUpperCase()}
                        />
                    : null
                }
            </div>
     );
}
 
export default LanguagesSwitchers;