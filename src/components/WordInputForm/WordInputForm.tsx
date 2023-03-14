import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { setCurrentInput, translateCurrentWord } from "../../store/actions/appActions";
import { IAppReducer } from "../../store/reducers/appReducer";

const WordInputForm = () => {
    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return ( 
        <form onSubmit={(e)=> {
            e.preventDefault();
            dispatchAsync(translateCurrentWord());
        }}>
        <input type="text" value={state.currentInput} onChange={(e) => {dispatch(setCurrentInput(e.target.value))}}/>
        <button >
                Отправить
        </button>
        </form> );
}
 
export default WordInputForm;