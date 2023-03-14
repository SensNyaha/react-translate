import { Dispatch, useEffect } from 'react';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

import LanguageSelect from '../LanguageSelect/LanguageSelect';

import { loadLanguages, setCurrentInput, translateCurrentWord } from '../../store/actions/appActions';
import {useDispatch, useSelector} from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';
import { store } from '../../store';

import arrowRight from './arrow-right.png';

const App = () => {

    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    useEffect(() => {
        dispatchAsync(loadLanguages())
    }, [])

    return ( 
        <>
            <input type="text" value={state.currentInput} onChange={(e) => {dispatch(setCurrentInput(e.target.value))}}/>
            <button 
                onClick={() => dispatchAsync(translateCurrentWord())}>
                    Отправить
            </button>

            <div className="result">
                {state.translation}
            </div>
            <div className="lang-select">
                {
                    state.fromLangs?.length && 
                        <LanguageSelect 
                            type='from'
                            placeholder='Choose first language'
                        />
                }
                {
                    <img src={arrowRight} alt="" className='lang-select__arrow'/>
                }
                {
                    state.toLangs?.length 
                    ?   <LanguageSelect 
                            type='to' 
                            placeholder='Choose second language'
                        /> 
                    : state.fromLangs?.length 
                    ?   <LanguageSelect 
                            hidden={true}
                            placeholder='Choose second language'
                        />
                    : null
                }
            </div>
        </>
    );
}
 
export default App;