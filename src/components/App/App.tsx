import { Dispatch, useEffect } from 'react';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';
import LanguageSelect from '../LanguageSelect/LanguageSelect';


import { loadLanguages, setCurrentInput, translateCurrentWord } from '../../store/actions/appActions';
import {useDispatch, useSelector} from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';
import { store } from '../../store';

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
            <div className="select">
                <div className="select__from">
                    {
                        state.fromLangs?.length && 
                            <LanguageSelect 
                                type='from'
                                placeholder='Choose first language'
                            />
                    }
                </div>
                <div className="select__to">
                    {
                        state.toLangs?.length && 
                            <LanguageSelect 
                                type='to' 
                                placeholder='Choose second language'
                            />
                    }
                </div>
            </div>
        </>
    );
}
 
export default App;