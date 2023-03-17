import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../store';
import { translatePreviousWord } from '../../store/actions/appActions';
import { IAppReducer } from '../../store/reducers/appReducer';
import './PreviousWords.scss';

const PreviousWords = () => {
    const dispatch = useDispatch();
    const dispatchAsync = store.dispatch as typeof store.dispatch | Dispatch<any>
    const state = useSelector((state: IAppReducer) => state) as IAppReducer;

    return (
        <>
            {
                state.previousWords.length 
                ? 
                    <div className="prev-words">
                        <div className="prev-words__title">
                            Previous translated words: {' '}
                        </div>
                        {/* <span className="prev-words__list"> */}
                            {state.previousWords.map((w, i) => 
                                <>
                                    <span 
                                        className='prev-words__word'
                                        key= {w.value+w.from+w.to}
                                        onClick = {() => dispatchAsync(translatePreviousWord(w.value, w.from, w.to))}
                                    >
                                        {w.value} ({w.from}-{w.to}){i === state.previousWords.length - 1 ? '.' : ','}
                                    </span>
                                    {' '}
                                </>
                            )}
                        {/* </span> */}
                    </div>
                : 
                    null
                }
        </>
    )
}
 
export default PreviousWords;