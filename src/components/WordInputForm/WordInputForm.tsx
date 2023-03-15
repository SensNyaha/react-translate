import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { setCurrentInput, translateCurrentWord } from "../../store/actions/appActions";
import { IAppReducer } from "../../store/reducers/appReducer";

import './WordInputForm.scss';
import arrowRight from './arrow-right.png';

const WordInputForm = () => {
    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return ( 
        <form className="input-form" onSubmit={(e)=> {
            e.preventDefault();
            dispatchAsync(translateCurrentWord());
        }}>
        <input className="input-form__input" type="text" value={state.currentInput} onChange={(e) => {dispatch(setCurrentInput(e.target.value))}}/>
        <button className="input-form__button">
            <img src={arrowRight} alt="" />
        </button>
        </form> );
}
 
export default WordInputForm;