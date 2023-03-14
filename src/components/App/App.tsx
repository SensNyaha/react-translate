import { Dispatch } from 'react';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.scss';

import { setCurrentInput, translateCurrentWord } from '../../store/actions/appActions';
import { useDispatch, useSelector } from 'react-redux';
import { IAppReducer } from '../../store/reducers/appReducer';
import { store } from '../../store';
import LanguagesSwitchers from '../LanguagesSwitchers/LanguagesSwitchers';



const App = () => {

    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

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

            <LanguagesSwitchers/>
        </>
    );
}
 
export default App;