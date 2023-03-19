import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/actions/appActions";
import { IAppReducer } from "../../store/reducers/appReducer";

import './ErrorModal.scss'

const ErrorModal = () => {
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;
    const dispatch = useDispatch();

    return ( 
        <div className={state.errorMessage ? 'error-modal opened' : 'error-modal'}>
            <div className={state.errorMessage ? 'error-modal__inner opened' : 'error-modal__inner'}>
                <span onClick={() => dispatch(setError(null))}>&times;</span>
                <h1 className="error-modal__title">
                    Something went wrong
                </h1>
                <div className="error-modal__text">
                    {state.errorMessage}
                </div>
            </div>
        </div>
    );
}
 
export default ErrorModal;