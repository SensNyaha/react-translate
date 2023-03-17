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
        <div className="prev-words">
            Previous translated words: {' '}
            <span className="prev-words__list">
                {state.previousWords.map((w, i) => 
                    <>
                        <span 
                            className='prev-word__word'
                            key= {w.value+w.from+w.to}
                            onClick = {() => dispatchAsync(translatePreviousWord(w.value, w.from, w.to))}
                        >
                            {w.value} ({w.from}-{w.to}){i === state.previousWords.length - 1 ? '.' : ','}
                        </span>
                        {' '}
                    </>
                )}
            </span>
        </div>
    );
}
 
export default PreviousWords;